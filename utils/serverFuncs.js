// const { ObjectId } = require("mongodb");
// const { Profiles } = require("../models");
// const mailSender = require("./mailSender");

import mailSender from "@utils/mailSender";

// // catch err in return
// export const     catchError = ({ res, err, status = 400, message = "Internal Server Error" }) => {
//   if (process.env.NODE_ENV === "development") console.log(`${res.req.originalUrl}: ${err || message}`);
//   res.status(status).json({ message });
// };

// verification code
export const verificationGenerator = (len = 256) => {
  let text = "";
  const allowed = "ABCDEFGHIkLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < len; i++) text += allowed.charAt(Math.floor(Math.random() * allowed.length));

  const session = text
    .replace(/\s/g, "")
    .match(/.{1,64}/g) // chunks of 32 bits
    .join("-"); //add hyphen after each chunk

  return session;
};

// resend email verification
export const resendVerification = async ({
  ref,
  name,
  code,
  email,
  label = "Link might have expired, we just sent another verification link",
}) => {
  const newVerification = code || verificationGenerator();

  await mailSender({
    email,
    subject: "Atlas Search Translation Email Verification",
    template: "verify",
    preheader: `Hello, ${name}! Kindly verify your email.`,
    verifyLink: `/auth/verifyMail?verification=${newVerification}&ref=${ref}`,
    name,
  });

  if (!code)
    await Profiles.updateOne({ _id: new ObjectId(ref) }, { $set: { "auth.verification": { code: newVerification, time: new Date() } } });

  throw { label };
};

// difference in hours between date
export const differenceInHour = (date) => {
  const diff = Math.round((new Date() - new Date(date)) / (1000 * 60 * 60));
  return diff;
};

// convert all values in object to lowercase
export const objectValuesToLowerCase = (object) => {
  const reqBody = {};

  for (const [key, value] of Object.entries(object)) {
    reqBody[key] = typeof value === "string" ? value.toLowerCase().trim() : value;
  }

  return reqBody;
};

export const catchApiError = ({ err, res }) => {
  // console.log(err);

  // catch catchApiError from pages/api
  console.assert(process.env.NODE_ENV === "production", Object.keys(err).length ? JSON.stringify(err) : err);

  return res.status(400).json({ label: err.label || "Unable to handle request" });
};
