import bcrypt from "bcryptjs";

import validate from "@utils/validator";
import clientPromise from "@utils/mongodb";
import mailSender from "@utils/mailSender";
import { catchApiError, verificationGenerator } from "@utils/serverFuncs";

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
      const verifyLink = `/auth/verifyMail?verification=${verification}&ref=${dbResponse.insertedId}`;

      await mailSender({
        name,
        email,
        verifyLink,
        template: "verify",
        subject: "Atlas Search Translation Email Verification",
        preheader: `Hello, ${name}! Kindly verify your email.`,
      });

      res.status(200).json({ status: "success" });
    } else {
      throw { label: "Server could not complete the process" };
    }
  } catch (err) {
    return catchApiError({ err, res });
  }
};

export default handler;
