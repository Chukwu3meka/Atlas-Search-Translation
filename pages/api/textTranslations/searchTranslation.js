import { catchApiError, objectValuesToLowerCase } from "@utils/serverFuncs";

const handler = async (req, res) => {
  try {
    const { sourceText, sourceLanguage, translationLanguage } = objectValuesToLowerCase(req.body);

    if ([sourceText, sourceLanguage, translationLanguage].some((x) => x === null || x === undefined))
      throw { label: "Search phrase cannot be empty" };

    const searchIndex = sourceLanguage === "english" ? "englishSearch" : sourceLanguage === "french" ? "frenchSearch" : "spanishIndex";

    const { Translations } = await require("@db").default();

    const result = await Translations.aggregate([
      { $search: { index: searchIndex, text: { query: sourceText, path: sourceLanguage } } },
      { $limit: 1 },
      // { $project: { _id: 0 } },
      { $project: { score: { $meta: "searchScore" }, [sourceLanguage]: 1, [translationLanguage]: 1 } },
    ]).toArray();

    const translation = {
      query: sourceText,
      id: result[0] ? result[0]._id : null,
      [sourceLanguage]: result[0] ? result[0][sourceLanguage] : `Nothing found for ${sourceLanguage}`,
      result: result[0] ? result[0][translationLanguage] : "no translation found",
    };

    console.log(translation);

    res.status(200).json(translation);
  } catch (err) {
    return catchApiError({ err, res });
  }
};

export default handler;
