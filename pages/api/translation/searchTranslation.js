export default async (req, res) => {
  try {
    const { sourceText, sourceLanguage, translationLanguage } = req.body;
    const { Greetings } = await require("@db").default();

    const projectLanguage =
      translationLanguage === "French" ? { french: 1 } : translationLanguage === "Spanish" ? { spanish: 1 } : { english: 1 };

    const exactMatch = await Greetings.findOne({ [sourceLanguage.toLowerCase()]: sourceText });

    // temporary fix for search score issues
    if (exactMatch) return res.status(200).json({ translation: exactMatch[`${translationLanguage.toLowerCase()}`], id: exactMatch._id });

    const searchQuery = [
      {
        $search: {
          text: {
            query: sourceText,
            path: sourceLanguage.toLowerCase(),
            // fuzzy: { maxEdits:  0 },
          },
        },
      },
      // { $project: { ...projectLanguage, english: 1, score: { $meta: "searchScore" } } },
      { $project: projectLanguage },
      { $limit: 1 },
    ];

    // const result = await Greetings.aggregate(searchQuery, { cursor: { batchSize: 1 } }).toArray();
    const result = await Greetings.aggregate(searchQuery).toArray();

    // console.log(result);

    const id = result && result[0] ? result[0]._id : null,
      translation = result && result[0] ? result[0][`${translationLanguage.toLowerCase()}`] : "no translation found";

    // res.status(200).json({ translation: "no translation found" });
    res.status(200).json({ translation, id });
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json({ translation: "no translation found" });
  }
};
