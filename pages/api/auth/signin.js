import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import validate from "@utils/validator";

export default async (req, res) => {
  try {
    const { password, email } = req.body;

    validate({ type: "email", value: email });
    validate({
      type: "password",
      value: password,
      attributes: ["hasNumber", "hasSpecialChar", "hasRange", "hasLetter"],
    });

    const { Profiles } = await require("@db").default();

    // verify that account exist, else throw an error
    const profileData = await Profiles.findOne({ email });
    if (!profileData) throw { label: "Invalid Email/Password" };

    const rightPassword = await bcrypt.compare(password, profileData.auth.password);

    if (rightPassword) {
      // reset wrongPassword counter
      await Profiles.updateOne({ email }, { $set: { "auth.wrongAttempts": 0 } });

      const token = jwt.sign({ session: profileData.auth.session }, process.env.SECRET, { expiresIn: "120 days" });

      return res.status(200).json({ token, session: profileData.auth.session });
    } else {
      // increment wrongPassword counter
      await Profiles.updateOne({ email }, { $inc: { "auth.wrongAttempts": 1 } });
      throw { label: "Invalid Email/Password" };
    }
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json({ error: error.label || "Internal Server error" });
  }
};
