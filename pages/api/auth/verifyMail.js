import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validate from "@utils/validator";
import mailSender from "@utils/mailSender";

// import { Profiles } from "../models";
import { catchError, verificationGenerator, resendVerification, differenceInHour } from "@utils/serverFuncs";

import clientPromise from "@utils/mongodb";
import { catchApiError } from "@utils/clientFuncs";

const ObjectId = require("mongodb").ObjectId;

const handler = async (req, res) => {
  const client = await clientPromise;
  const Profiles = client.db().collection("profiles");
  try {
  } catch (err) {
    return catchApiError({ err, res });
  }
};

export default handler;
