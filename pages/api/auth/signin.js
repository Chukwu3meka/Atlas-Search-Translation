import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";

import validate from "@utils/validator";
import clientPromise from "@utils/mongodb";
import { resendVerification, differenceInHour, catchApiError } from "@utils/serverFuncs";

const handler = async (req, res) => {
  try {
    const { password, email } = req.body;

    validate({ type: "email", value: email });
    validate({
      type: "password",
      value: password,
      attributes: ["hasNumber", "hasSpecialChar", "hasRange", "hasLetter"],
    });

    console.log("asdsadas 1");

    const client = await clientPromise;
    const Profiles = client.db().collection("profiles");

    console.log("asdsadas 2", email);

    // verify that account exist, else throw an error
    const profileData = await Profiles.findOne({ email });
    if (!profileData) throw { label: "Invalid Email/Password" };

    console.log("asdsadas 3");
    const {
      _id,
      name,
      auth: {
        password: dbPassword,
        wrongAttempts,
        accountLocked,
        emailVerified,
        session,
        role,
        verification: { code, time },
      },
    } = profileData;

    const rightPassword = await bcrypt.compare(password, dbPassword);

    if (rightPassword) {
      // check if account has been locked for 3 hours
      const accountTempLocked = differenceInHour(accountLocked) <= 3;

      if (wrongAttempts >= 5 && accountTempLocked) throw { label: "Account is temporarily locked, Please try again later" };

      if (!emailVerified) {
        return await resendVerification({
          name,
          email,
          ref: _id,
          code: differenceInHour(time) <= 24 ? code : null,
          label: "Email not verified! We just sent another verification mail",
        });
      }

      // reset wrongPassword counter
      await Profiles.updateOne({ email }, { $set: { "auth.wrongAttempts": 0 } });

      const token = jwt.sign({ session, name, role }, process.env.JWT_SECRET, { expiresIn: "120 days" });

      setCookie("atlasSearchTranslation", token, {
        res,
        req,
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE === "production", // Setting a cookie without Secure will be rejected.
        sameSite: process.env.NODE === "production" ? "strict" : "lax", // <= SameSite=None must be secure
        expires: new Date(new Date().getTime() + 3600000 * 24 * 120), // <= expires in 120 days,
      });

      res.status(200).json({ name, role });
    } else {
      await Profiles.updateOne(
        { email },
        {
          $inc: { "auth.wrongAttempts": 1 }, // <= increment wrong attempts
          $set: { "auth.accountLocked": new Date() }, // <= set new time to track account locked
        }
      );

      throw { label: "Invalid Email/Password" };
    }
  } catch (err) {
    return catchApiError({ err, res });
  }
};

export default handler;
