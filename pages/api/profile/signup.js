import validate from "@utils/validator";

const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
  service: "zoho",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

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

    const id = "ssdd";
    const verid = `${new Date().getTime()}-${id}-${new Date().toDateString()}`;

    await mailTransporter.sendMail(
      {
        from: process.env.EMAIL_ADDRESS,
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
              <h6>Hi ${name}</h6>
              <main>Click on the link to verify your mail http://opentranslation.vercel.app/auth/verify?verid=${verid}</main>
              <hr/>
              OpenTranslation  
            </body>
          </html>
            `,
      },

      function (err, data) {
        if (process.env.NODE_ENV !== "production") {
          if (err) {
            console.log("error sending mail", err);
          }
        }
      }
    );

    console.log({ password, email, name, c: process.env.EMAIL_PASSWORD, a: process.env.EMAIL_ADDRESS });

    // console.log("hete", Suggestion);

    // await Profile.insertOne({password, email, name,});

    res.status(200).json({ status: "success" });
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json({ error: error.message || "Internal Server error" });
  }
};
