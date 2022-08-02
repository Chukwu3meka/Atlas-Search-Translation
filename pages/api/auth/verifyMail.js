import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validate from "@utils/validator";
import mailSender from "@utils/mailSender";

// import { Profiles } from "../models";
import { catchError, verificationGenerator, resendVerification, differenceInHour } from "@utils/serverFuncs";

import clientPromise from "@utils/mongodb";

const ObjectId = require("mongodb").ObjectId;

const handler = async (req, res) => {
  const client = await clientPromise;
  const Profiles = client.db().collection("profiles");
  try {
  } catch (err) {
    console.assert(process.env.NODE_ENV === "production", JSON.stringify(err));
    return res.status(400).json({ label: err.label || "Temporary server error" });
  }
};

export default handler;
