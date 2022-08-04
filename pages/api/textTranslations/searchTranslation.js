import validate from "@utils/validator";
import clientPromise from "@utils/mongodb";
import { resendVerification, differenceInHour, catchApiError, objectValuesToLowerCase } from "@utils/serverFuncs";

const handler = async (req, res) => {
  try {
    const { sourceText, sourceLanguage, translationLanguage } = objectValuesToLowerCase(req.body);

    if ([sourceText, sourceLanguage, translationLanguage].some((x) => x === null || x === undefined))
      throw { label: "Search phrase cannot be empty" };

    const client = await clientPromise;
    const Translations = client.db().collection("greetings");

    const searchOption = [
      {
        $search:
          // sourceText.length > 6   sln to atlas search  returning multiple same score
          // sourceText.length > 6
          //   ? {
          //       // phrase: {
          //       //   query: sourceText,
          //       //   path: souSrceLanguage.toLowerCase(),
          //       // },
          //       text: {
          //         query: sourceText,
          //         path: sourceLanguage,
          //         // fuzzy: {},
          //       },
          //     }
          //   :
          {
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
            // },
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
    return catchApiError({ err, res });
  }
};

export default handler;
