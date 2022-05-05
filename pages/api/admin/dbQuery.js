const fs = require("fs");

export default async (req, res) => {
  try {
    const { Greetings } = await require("@db").default();

    // you don't need to tell an attacker, he/she sent a wrong key. Let them go through the pain
    if (process.env.NODE_ENV !== "development") throw "service unavailable/wrong URL queried";

    await Greetings.find({}).sort({ _id: -1 });

    // write invalidTranslations to logs.invalidTranslations.js in root file
    fs.writeFile("./logs.invalidTranslations.js", `export default ${JSON.stringify(invalidTranslations)}`, (err) => console.log(err));

    return res.status(200).json(`Sucessfully added ${nonDuplicateTranslation.length} documents`);
  } catch (error) {
    // log errors only in development
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json(false);
  }
};
