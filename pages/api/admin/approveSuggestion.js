export default async (req, res) => {
  try {
    const { _id, session, sourceText, sourceLanguage, translationLanguage, suggestedTranslation } = req.body;

    const { Profiles, Greetings, Suggestions } = await require("@db").default();

    // verify that account exist and has administrative right, else throw an error
    const profileData = await Profiles.findOne({ "auth.session": session });
    if (!profileData) throw { label: "Incorrect URL" };
    if (!["admin", "superAdmin"].includes(profileData.auth.role)) throw { label: "Incorrect URL" };

    // update translation else create a new document if it does not exist
    await Greetings.updateOne(
      { [sourceLanguage]: sourceText },
      { $set: { [translationLanguage]: suggestedTranslation } },
      { upsert: true }
    );

    // remove doc from Suggestions after update or insert
    await Suggestions.deleteOne({ _id });

    return res.status(200).json({ status: "success" });
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json({ error: error.label || "Internal Server error" });
  }
};
