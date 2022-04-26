export default async (req, res) => {
  try {
    const { sourceText, sourceLanguage, translationLanguage } = req.body;
    console.log(process.env.MONGODB_URI, { sourceText, sourceLanguage, translationLanguage });
    const { Greetings } = await require("@db").default();

    var result = await Greetings.aggregate([
      {
        $string: {
          text: {
            query: sourceText,
            path: sourceLanguage.toLowerCase(),
          },
        },
      },
      {
        $project: {
          french: translationLanguage === "French" ? 1 : 0,
          english: translationLanguage === "English" ? 1 : 0,
          spanish: translationLanguage === "Spanish" ? 1 : 0,
        },
      },
    ]).toArray();

    console.log(result);

    // return first array since its only one player we're after
    // return res.status(200).json(result[0]);
    return res.status(200).json("null");

    // return res.status(200).json({
    //   ref: result._id,
    //   name: result.name,
    //   roles: result.roles,
    //   stat: [
    //     { label: "club", data: result.club },
    //     { label: "country", data: result.country },
    //     { label: "dob", data: new Date(result.dob).toDateString() },
    //     { label: "emotion", data: result.emotion },
    //     { label: "rating", data: result.rating },
    //     { label: "value", data: result.value },
    //   ],
    // });

    //   {
    //     $mergeObjects: [
    // "$$ROOT",      {
    //   club: "$title" ,stat:[
    //     { label: "club", data: "$club" }
    // ]

    // }
  } catch (error) {
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json(false);
  }
};
