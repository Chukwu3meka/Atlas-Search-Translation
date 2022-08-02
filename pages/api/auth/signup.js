import bcrypt from "bcryptjs";

import validate from "@utils/validator";
import mailSender from "@utils/mailSender";
import clientPromise from "@utils/mongodb";
import { verificationGenerator } from "@utils/serverFuncs";

const handler = async (req, res) => {
  try {
    const { password, email, name } = req.body;

    validate({ type: "handle", value: name, label: "Name", attributes: ["hasRange(3,30)"] });
    validate({ type: "email", value: email });
    validate({
      type: "password",
      value: password,
      attributes: ["hasNumber", "hasSpecialChar", "hasRange", "hasLetter"],
    });

    const client = await clientPromise;
    const Profiles = client.db().collection("profiles");

    // check if email is taken already
    const emailTaken = await Profiles.findOne({ email });
    if (emailTaken) throw { label: "Email already taken" };

    const verification = verificationGenerator(),
      hashedPassword = await bcrypt.hash(password, 10);

    const dbResponse = await Profiles.insertOne({
      name,
      email,
      stat: {
        dateCreated: new Date(),
      },
      auth: {
        role: "user",
        emailVerified: false,
        verification: {
          code: verification,
          time: new Date(),
        },
        password: hashedPassword,
        wrongAttempts: 0, // <= account locked && verification will be reset after 5 attempts
        accountLocked: false,
      },
    });

    if (dbResponse && dbResponse.insertedId) {
      const ObjectId = require("mongodb").ObjectId,
        verifyLink = `/auth/verifyMail?verification=${verification}&ref=${dbResponse.insertedId}`;

      console.log(2, new ObjectId(dbResponse.insertedId), email);
      await Profiles.updateOne({ _id: new ObjectId(dbResponse.insertedId), email });
      console.log(3);

      await mailSender({
        name,
        email,
        verifyLink,
        template: "verify",
        subject: "Email Verification",
        preheader: `Hello, ${name}! Kindly verify your email.`,
      });
      console.log(4);
      res.status(200).json({ status: "success" });
    } else {
      throw { label: "Server could not complete the process" };
    }
  } catch (err) {
    console.assert(process.env.NODE_ENV === "production", JSON.stringify(err));
    return res.status(400).json({ label: err.label || "Unable to create account" });
  }
};

export default handler;
