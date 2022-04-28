export default async (req, res) => {
  try {
    const { Greetings } = await require("@db").default();

    // you don't need to tell an attacker, he/she sent a wrong key. Let them go through the pain
    if (process.env.NODE_ENV !== "development") throw "service unavailable/wrong URL queried";

    // Removes all documents that match the filter from a collection.
    // but not the collection itself
    await Greetings.deleteMany({});

    return res.status(200).json("success");
  } catch (error) {
    // log errors only in development
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json(false);
  }
};
