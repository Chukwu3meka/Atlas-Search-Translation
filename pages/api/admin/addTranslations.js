const fs = require("fs");

export default async (req, res) => {
  try {
    const translations = require("@source/ongoingTranslations").default;

    // console.log(translations.length);
    // const translationsInDatabase = require("@source/databaseTranslations").default;

    // const { Greetings } = await require("@db").default();

    // // you don't need to tell an attacker, he/she sent a wrong key. Let them go through the pain
    // if (process.env.NODE_ENV !== "development") throw "service unavailable/wrong URL queried";

    // // invalid translations
    // const invalidTranslations = [];

    // // remove translations already in db

    const nonDuplicateTranslation = [];
    // const nonDuplicateTranslation = await translations.filter((x) => {
    //   if (
    //     x.english &&
    //     x.french &&
    //     x.spanish &&
    //     !translationsInDatabase.find((y) => y.english.toLowerCase() === x.english.toLowerCase())
    //   ) {
    //     return x;
    //   } else {
    //     invalidTranslations.push(x);
    //   }
    // });

    // //   // insertMany is best for adding multiple documents to MongoDB, we could have used `.insert` or `.create`, but in a situation where we hav 70,000 files, that won't be wise

    // await Greetings.insertMany(nonDuplicateTranslation);

    // // write invalidTranslations to logs.invalidTranslations.js in root file
    // fs.writeFile("./logs.invalidTranslations.js", `export default ${JSON.stringify(invalidTranslations)}`, (err) => console.log(err));

    return res.status(200).json(`Sucessfully added ${nonDuplicateTranslation.length} documents`);
  } catch (error) {
    // log errors only in development
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json(false);
  }
};
