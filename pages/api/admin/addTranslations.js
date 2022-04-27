export default async (req, res) => {
  try {
    const translations = require("@source/translations").default;

    const { Greetings } = await require("@db").default();

    // // you don't need to tell an attacker, he/she sent a wrong key. Let them go through the pain
    // if (req.body.adminKey !== process.env.ADMIN_KEY) throw "service unavailable/wrong URL queried";

    //   // insertMany is best for adding multiple documents to MongoDB, we could have used `.insert` or `.create`, but in a situation where we hav 70,000 files, that won't be wise
    await Greetings.insertMany(translations);

    // console.log(translations);

    return res.status(200).json("success");
  } catch (error) {
    // log errors only in development
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json(false);
  }
};
