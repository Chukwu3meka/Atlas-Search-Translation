import bcrypt from "bcryptjs";
import validate from "@utils/validator";

// import { Profiles } from "../models";
import { resendVerification, differenceInHour } from "@utils/serverFuncs";

import clientPromise from "@utils/mongodb";
import { catchApiError } from "@utils/serverFuncs";

const handler = async (req, res) => {
  try {
    const { verification, ref } = req.body;

    try {
      validate({
        type: "string",
        value: verification,
        label: "Verification Code",
        attributes: ["hasRange(256,256)"],
      });
      validate({ type: "string", value: ref, label: "Reference", attributes: ["hasRange(24,24)", "alphanumeric"] });
    } catch (err) {
      throw { label: "Link appears to be broken, Kindly Click on the button or link, sent to your mail" };
    }

    const client = await clientPromise,
      ObjectId = require("mongodb").ObjectId,
      Profiles = client.db().collection("profiles"),
      profileData = await Profiles.findOne({ _id: new ObjectId(ref) });

    // check if profile exists and has not been verified
    if (profileData && !profileData.auth.emailVerified) {
      const {
        email,
        name,
        auth: {
          verification: { code, time },
        },
      } = profileData;

      if (verification === code) {
        // check if date exceeds 24 hrs
        const expiredVerification = differenceInHour(time) > 24;

        // resend new verification link
        if (expiredVerification) return await resendVerification({ email, name, ref });

        await Profiles.updateOne(
          { _id: new ObjectId(ref), "auth.verification.code": verification },
          { $set: { "auth.verification.code": false, "auth.emailVerified": true } }
        );

        return res.status(200).json({ status: "Email Verification successful" });
      } else {
        return await resendVerification({ email, name, ref }); // <= resend new verification link
      }
    } else {
      throw { label: "Link might have expired or is invalid" };
    }
  } catch (err) {
    return catchApiError({ err, res });
  }
};

export default handler;
