const fs = require("fs");

export default async (req, res) => {
  try {
    const phrases = require("./phrases").default;

    const uniquePhrases = [];

    phrases.forEach((phrase) => {
      // get all strings in phrase, like a user is typing each word to enable swift translation
      const wordsArray = phrase.toLowerCase().split(" ");

      // break phrase in incrementing fashion
      for (let i = 1; i <= wordsArray.length; i++) {
        const phrase = wordsArray.slice(0, i).join(" ");
        const uniquePhrase = uniquePhrases.find((x) => x.english === phrase) ? false : true;

        if (uniquePhrase)
          uniquePhrases.push({
            english: phrase,
            french: "",
            spanish: "",
          });
      }
    });

    fs.writeFile("./uniquesPhrases.js", `export default ${JSON.stringify(uniquePhrases)}`, (err) => console.log(err));
    return res.status(200).json("success");
  } catch (error) {
    // log errors only in development
    process.env.NODE_ENV !== "production" && console.log(error);
    return res.status(401).json(false);
  }
};
