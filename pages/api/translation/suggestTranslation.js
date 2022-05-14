export default async (req, res) => {
  try {
    const { sourceText, sourceLanguage, translationText, translationLanguage, translationId, suggestedTranslation } = req.body;

    const { Suggestions } = await require("@db").default();

    await Suggestions.insertOne({
      sourceText,
      sourceLanguage,
      translationText,
      translationLanguage,
      translationId,
      suggestedTranslation,
    });

    res.status(200).json({ status: "success" });
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json({ error: "suggestion not recived" });
  }
};
