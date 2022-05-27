const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
  service: "zoho",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const mailSender = async ({ to, subject, html }) =>
  await mailTransporter.sendMail(
    {
      from: process.env.EMAIL_ADDRESS,
      to,
      subject,
      html,
    },

    (err, data) => {
      if (err) throw "error sending mail";
      if (data) return true;

      if (process.env.NODE_ENV !== "production") console.log("nodemailer res", { err, data });
    }
  );

export default mailSender;
