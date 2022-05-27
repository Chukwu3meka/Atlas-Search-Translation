import mailSender from "@utils/mailSender";
import validate from "@utils/validator";
import bcrypt from "bcryptjs";

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
    if (emailTaken) throw { message: "Email taken" };

    const verificationLink = `
    ${Math.random().toString(16).slice(2)}
    ${Math.random().toString(36).substring(2)}
    ${new Date().getTime()}
    ${Math.random().toString(36).substring(2)}
    ${Math.random().toString(16).slice(2)}
    `;

    const verificationCode = Math.random().toString(16).slice(2).substring(6);

    await mailSender({
      to: email,
      subject: "Email Verification from OpenTranslation",
      html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Verification!!!</title>
      </head>

      <body>
        <p>Hi ${name},</p>
        <main>Welcome to OpenTranslation, Click on the link below to verify your mail http://opentranslation.vercel.app/auth/verify?verificationLink=${verificationLink}</main>
        <hr/>
        OpenTranslation  
      </body>
    </html>
      `,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    await Profiles.insertOne({
      name,
      email,
      $currentDate: { dateCreated: true },
      auth: {
        verificationLink,
        verificationCode,
        password: hashedPassword,
      },
    });

    res.status(200).json({ status: "success" });
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json({ error: error.message || "Internal Server error" });
  }
};
