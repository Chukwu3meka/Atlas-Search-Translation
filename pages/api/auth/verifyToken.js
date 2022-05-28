import jwt from "jsonwebtoken";

export default async (req, res) => {
  try {
    const { clientToken } = req.body;
    if (!clientToken) throw { label: "Suspicious Token Received" };

    const decoded = jwt.verify(clientToken, process.env.SECRET);
    if (!decoded) throw { label: "Suspicious Token Received" };

    const { session } = decoded;
    if (!session) throw { label: "Suspicious Token Received" };

    const { Profiles } = await require("@db").default();
    const profileData = await Profiles.findOne({ "auth.session": session });
    if (!profileData) throw { label: "Suspicious Token Received" };

    const {
      name,
      auth: { role },
    } = profileData;

    return res.status(200).json({ session, userData: { name, role } });
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json({ error: error.label || "Internal Server error" });
  }
};
