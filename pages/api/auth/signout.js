import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { deleteCookie } from "cookies-next";

import { catchApiError } from "@utils/serverFuncs";

const handler = async (req, res) => {
  try {
    deleteCookie("atlasSearchTranslation", { req, res });

    res.status(200).json({ json: "Session deleted successfully" });
  } catch (err) {
    return catchApiError({ err, res });
  }
};

export default handler;
