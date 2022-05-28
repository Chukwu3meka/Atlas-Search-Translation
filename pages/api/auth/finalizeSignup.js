import validate from "@utils/validator";
import mailSender from "@utils/mailSender";
import { verificationGenerator } from "@utils/clientFuncs";

const ObjectId = require("mongodb").ObjectId;

export default async (req, res) => {
  try {
    const { verification, ref } = req.body;

    validate({ type: "alphanumeric", value: verification, label: "Verification Code", attributes: ["hasRange(256,256)", "allowDash"] });
    validate({ type: "alphanumeric", value: ref, label: "Reference", attributes: ["hasRange(24,24)"] });

    const { Profiles } = await require("@db").default();

    const profileData = await Profiles.findOne({ _id: new ObjectId(ref) });

    // check if profile exists and has not been verified
    if (profileData && profileData.auth.verification) {
      const {
        email,
        name,
        auth: { verification: dbVerification },
      } = profileData;
      if (verification === dbVerification) {
        // verify profile
        await mailSender({
          to: email,
          subject: "Email Verification from OpenTranslation",
          html: `      
              <p>Hi ${name},</p>
              <main>Welcome to OpenTranslation, Your email has been verified. You can login now</main>
            `,
        });
        await Profiles.updateOne(
          { _id: new ObjectId(ref), "auth.verification": verification },
          { $set: { "auth.verification": false } }
        );

        return res.status(200).json({ status: "Email Verification successful" });
      } else {
        // resend new verification link

        const newVerification = verificationGenerator();

        await mailSender({
          to: email,
          subject: "Email Verification from OpenTranslation",
          html: `      
              <p>Hi ${name},</p>
              <main>Welcome to OpenTranslation, Click on the link below to verify your mail http://opentranslation.vercel.app/auth/signup?verification=${newVerification}&ref=${ref}</main>
            `,
        });

        await Profiles.updateOne({ _id: new ObjectId(ref) }, { $set: { "auth.verification": newVerification } });
      }
      throw { label: "Link might have expired, we just sent another verification link" };
    } else {
      throw { label: "Link might have expired or is invalid" };
    }
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json({ error: error.label || "Internal Server error" });
  }
};
