const { ObjectId } = require("mongodb");
const { Profiles } = require("../models");
const mailSender = require("./mailSender");

// catch err in return
module.exports.catchError = ({ res, err, status = 400, message = "Internal Server Error" }) => {
  if (process.env.NODE_ENV === "development") console.log(`${res.req.originalUrl}: ${err || message}`);
  res.status(status).json({ message });
};

// verification code
module.exports.verificationGenerator = (len = 256) => {
  let text = "";
  const allowed = "ABCDEFGHIkLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
  for (let i = 0; i < len; i++) text += allowed.charAt(Math.floor(Math.random() * allowed.length));

  return text.replace(/\s/g, "");
};

// resend email verification
module.exports.resendVerification = async ({
  ref,
  name,
  code,
  email,
  errMsg = "Link might have expired, we just sent another verification link",
}) => {
  const newVerification = code || this.verificationGenerator();

  await mailSender({
    email,
    subject: "Email Verification",
    template: "verify",
    preheader: `Hello, ${name}! Kindly verify your email.`,
    verifyLink: `/auth/verifyMail?verification=${newVerification}&ref=${ref}`,
    name,
  });

  if (!code)
    await Profiles.updateOne({ _id: new ObjectId(ref) }, { $set: { "auth.verification": { code: newVerification, time: new Date() } } });

  throw { message: errMsg };
};

// difference in hours between date
module.exports.differenceInHour = (date) => {
  const diff = Math.round((new Date() - new Date(date)) / (1000 * 60 * 60));
  return diff;
};

// convert all values in object to lowercase
module.exports.objectValuesToLowerCase = (object) => {
  const reqBody = {};

  for (const [key, value] of Object.entries(object)) {
    reqBody[key] = typeof value === "string" ? value.toLowerCase().trim() : value;
  }

  return reqBody;
};
