const jwt = require("jsonwebtoken");
import { getCookie } from "cookies-next";

import clientPromise from "@utils/mongodb";

const handler = async (req, res) => {
  try {
    const token = getCookie("atlasSearchTranslation", { req, res });
    // if (!token) throw { label: "You're not authorized to access this page" };

    return jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) throw { label: "Suspicious token" };
      if (!decoded) throw { label: "User not Authenticated" };

      const { session, name, role } = decoded;

      if (session && name && role) {
        const client = await clientPromise;
        const Profiles = client.db().collection("profiles");

        // verify that session account exist, else throw an error
        const profileData = await Profiles.findOne({ "auth.session": session, name, "auth.role": role });
        if (!profileData) throw { label: "Session is broken" };

        return res.status(200).json({ name, role });
      } else {
        throw { label: "Invalid token payload" };
      }
    });
  } catch (err) {
    console.assert(process.env.NODE_ENV === "production", JSON.stringify(err));
    return res.status(400).json({ label: err.label || "Unable to validate session" });
  }
};

export default handler;
