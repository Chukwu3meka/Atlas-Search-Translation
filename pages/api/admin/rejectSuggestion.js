const ObjectId = require("mongodb").ObjectId;

export default async (req, res) => {
  try {
    const { _id, session } = req.body;

    const { Profiles, Suggestions } = await require("@db").default();

    // verify that account exist and has administrative right, else throw an error
    const profileData = await Profiles.findOne({ "auth.session": session });
    if (!profileData) throw { label: "Incorrect URL" };
    if (!["admin", "superAdmin"].includes(profileData.auth.role)) throw { label: "Incorrect URL" };

    // remove doc from Suggestions
    await Suggestions.deleteOne({ _id: new ObjectId(_id) });

    return res.status(200).json({ status: "success" });
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json({ error: error.label || "Internal Server error" });
  }
};
