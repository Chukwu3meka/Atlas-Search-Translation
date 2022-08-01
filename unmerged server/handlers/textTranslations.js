const { Translations, Suggestions } = require("../models");
const { catchError, objectValuesToLowerCase } = require("../utils/quickFunctions");

exports.searchTranslation = async (req, res) => {
  try {
    const { sourceText, sourceLanguage, translationLanguage } = objectValuesToLowerCase(req.body);

    const searchOption = [
      {
        $search:
          // sourceText.length > 6   what if it  returning multiple same score
          sourceText.length > 6
            ? {
                // phrase: {
                //   query: sourceText,
                //   path: souSrceLanguage.toLowerCase(),
                // },
                text: {
                  query: sourceText,
                  path: sourceLanguage,
                  // fuzzy: {},
                },
              }
            : {
                index: "lessThanSixChars",
                compound: {
                  must: [
                    {
                      text: {
                        query: sourceText,
                        path: sourceLanguage,
                        score: { boost: { value: 5 } },
                      },
                    },
                    {
                      // autocomplete: {
                      phrase: {
                        query: sourceText,
                        path: sourceLanguage,
                      },
                    },
                  ],
                },
              },
      },
      {
        // $project: translationLanguage === "French" ? { french: 1 } : translationLanguage === "Spanish" ? { spanish: 1 } : { english: 1 },

        $project: {
          french: 1,
          english: 1,
          spanish: 1,
          score: { $meta: "searchScore" },
        },
      },
      { $limit: 4 },
    ];

    const result = await Translations.aggregate(searchOption).toArray();

    // const translation = result && result[0] ? result[0][`${translationLanguage.toLowerCase()}`] : "no translation found";

    // Suggestions.in

    const translation = {
      query: sourceText,
      id: result[0] ? result[0]._id : null,
      result: result[0] ? result[0][translationLanguage] : "no translation found",
    };

    res.status(200).json(translation);
  } catch (err) {
    console.log(err);
    return catchError({ res, err, message: err.message || "translation not found" });
  }
};

exports.suggestTranslation = async (req, res) => {
  try {
    const { language, suggestion, query, translation = "no translation found" } = objectValuesToLowerCase(req.body);

    if ([language, suggestion, query, translation].includes(null) || [language, suggestion, query, translation].includes(undefined))
      throw "Parameters broken";

    await Suggestions.insertOne({ query, translation, suggestion, ...objectValuesToLowerCase(language) });

    res.status(200).json({ status: "success" });
  } catch (err) {
    console.log(err);
    return catchError({ res, err, message: err.message || "Suggestion not sent" });
  }
};

exports.starter = async (req, res) => {
  try {
    res.status(200).json("successful");
  } catch (err) {
    return catchError({ res, err, message: err.message || "An error occured" });
  }
};
