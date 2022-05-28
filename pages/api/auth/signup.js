import bcrypt from "bcryptjs";

import validate from "@utils/validator";
import mailSender from "@utils/mailSender";
import { verificationGenerator } from "@utils/clientFuncs";

export default async (req, res) => {
  try {
    const { password, email, name } = req.body;

    validate({ type: "handle", value: name, label: "Name", attributes: ["hasRange(3,30)"] });
    validate({ type: "email", value: email });
    validate({
      type: "password",
      value: password,
      attributes: ["hasNumber", "hasSpecialChar", "hasRange", "hasLetter"],
    });

    const { Profiles } = await require("@db").default();

    // check if email is taken already
    const emailTaken = await Profiles.findOne({ email });
    if (emailTaken) throw { label: "Email taken" };

    const verification = verificationGenerator();

    const hashedPassword = await bcrypt.hash(password, 10);

    const dbResponse = await Profiles.insertOne({
      name,
      email,
      dateCreated: new Date(),
      auth: {
        verification,
        password: hashedPassword,
        wrongAttempts: 0, // <= account locked && verification will be reset after 7 attempts
      },
    });

    if (dbResponse && dbResponse.insertedId) {
      await mailSender({
        to: email,
        subject: "Email Verification from OpenTranslation",
        html: `
            <p>Hi ${name},</p>
            <main>Welcome to OpenTranslation, Click on the link below to verify your mail http://opentranslation.vercel.app/auth/signup?verification=${verification}&ref=${dbResponse.insertedId}</main>
          `,
      });
    }

    res.status(200).json({ status: "success" });
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json({ error: error.label || "Internal Server error" });
  }
};
