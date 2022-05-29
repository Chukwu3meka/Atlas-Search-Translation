const limit = 5;

export default async (req, res) => {
  try {
    const { session, initialRequest, lastDocId } = req.body;

    const { Profiles, Suggestions } = await require("@db").default();

    // verify that account exist and has administrative right, else throw an error
    const profileData = await Profiles.findOne({ "auth.session": session });
    if (!profileData) throw { label: "Incorrect URL" };
    if (!["admin", "superAdmin"].includes(profileData.auth.role)) throw { label: "Incorrect URL" };

    // get more docs than required, to see if collect has more docs for another query
    const suggestionsCursor = initialRequest
      ? Suggestions.find({}).limit(limit + 1)
      : Suggestions.find({ _id: { $gt: lastDocId } }).limit(limit + 1);

    const suggestions = await suggestionsCursor.toArray(),
      hasNextDoc = suggestions.length > limit;

    return res.status(200).json({ suggestions: suggestions.slice(0, limit), hasNextDoc });
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json({ error: error.label || "Internal Server error" });
  }
};
