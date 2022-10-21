import { MongoClient } from "mongodb";

const connectionString = process.env.MONGODB_URI;
// process.env.NODE_ENV === "production" ? process.env.MONGODB_URI : "mongodb://localhost:27017/AtlasSearchTranslation";

// throw an error, if mongodb uri is not found
if (!connectionString) {
  throw new Error("Please add your Mongo URI to env variables");
}

// for the livetime of the app, we don't want to keep connecting and connecting
// we'll try to cache our connetion
let cachedClient = null;
let cachedDb = null;

// we'll export our collections here, once connection is established
const collections = async (db) => {
  const Database = db;
  const Profiles = await db.collection("profiles");
  const Translations = await db.collection("greetings");
  const Suggestions = await db.collection("suggestions");

  // const Players = await db.collection("players");
  // const Endpoints = await db.collection("endpoints");

  return { Suggestions, Translations, Database, Profiles };
};

async function connectToDatabase() {
  // async function connectToDatabase() {
  // check if we've cached a connection previously, if so use cached connection
  if (cachedClient && cachedDb) return await collections(cachedDb);

  // create new MongoDB connection
  const client = await MongoClient.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // create a new database instance, using dbname passed in the MongoDB URI
  const db = await client.db();

  // store connection instance in cache
  cachedClient = client;
  cachedDb = db;

  // return list of available connections
  return await collections(db);
}

export default connectToDatabase;

// if you're still confused about the connecting MongoDB to Next.js
// visit https://github.com/kukicado/nextjs-with-mongodb github repo,
// and a post by the author - Ado Kukic
// https://www.mongodb.com/developer/how-to/nextjs-with-mongodb/
