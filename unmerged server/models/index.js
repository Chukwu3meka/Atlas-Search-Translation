const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI; // <=  Connection URI

// throw an error, if mongodb uri is not found
if (!uri) throw new Error("Please add your Mongo URI to env variables");

const client = new MongoClient(uri);

async function main() {
  await client.connect(); // <=  Use connect method to connect to the server
  return true;
}

main()
  .then(console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error(`MongoDB Error: ${err}`));
// .finally(() => client.close()); // <= terminates connection

exports.Suggestions = client.db().collection("suggestions");
exports.Translations = client.db().collection("greetings");
exports.Profiles = client.db().collection("profiles");
