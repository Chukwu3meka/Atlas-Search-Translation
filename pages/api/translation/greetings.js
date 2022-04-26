export default async (req, res) => {
  try {
    const { sourceText, sourceLanguage, translationLanguage } = req.body;
    const { Greetings } = await require("@db").default();

    const projectOption =
      translationLanguage === "French" ? { french: 1 } : translationLanguage === "Spanish" ? { spanish: 1 } : { english: 1 };

    const searchQuery = [
      {
        $search: {
          text: {
            query: sourceText,
            path: sourceLanguage.toLowerCase(),
          },
        },
      },
      {
        $project: projectOption,
      },
    ];

    const result = await Greetings.aggregate(searchQuery, { cursor: { batchSize: 1 } }).toArray();

    const translation = result
      ? result[0]
        ? result[0][`${translationLanguage.toLowerCase()}`]
        : "no translation found"
      : "no translation found";

    return res.status(200).json({ translation });
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json({ translation: "no translation found" });
  }
};
