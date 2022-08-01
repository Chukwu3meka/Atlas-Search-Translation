const jwt = require("jsonwebtoken");
import { getCookie } from "cookies-next";

import clientPromise from "@utils/mongodb";

const handler = async (req, res) => {
  try {
    const token = getCookie("atlasSearchTranslation", { req, res });
    // if (!token) throw { message: "You're not authorized to access this page" };

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Suspicious token" });
      } else {
        const { session, name, role } = decoded;

        if (session && name && role) {
          const client = await clientPromise;
          const Profiles = client.db().collection("profiles");

          // verify that session account exist, else throw an error
          const profileData = await Profiles.findOne({ "auth.session": session, name, "auth.role": role });
          if (!profileData) throw { message: "Session is broken" };

          return res.status(200).json({ name, role });
        } else {
          throw { message: "Invalid token payload" };
        }
      }
    });
  } catch (err) {
    console.assert(process.env.NODE_ENV === "production", err);
    return res.status(400).json({ label: err.label || "Unable to validate session" });
  }
};

export default handler;
