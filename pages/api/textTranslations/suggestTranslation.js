import { catchApiError, objectValuesToLowerCase } from "@utils/serverFuncs";

const handler = async (req, res) => {
  try {
    const { Suggestions } = await require("@db").default();

    const { language, suggestion, query, translation = "no translation found" } = objectValuesToLowerCase(req.body);

    if ([language, suggestion, query, translation].includes(null) || [language, suggestion, query, translation].includes(undefined))
      throw "Parameters broken";

    await Suggestions.insertOne({ query, translation, suggestion, ...objectValuesToLowerCase(language) });

    res.status(200).json({ status: "success" });
  } catch (err) {
    return catchApiError({ err, res });
  }
};

export default handler;
