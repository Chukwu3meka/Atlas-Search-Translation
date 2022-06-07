import { MongoClient } from "mongodb";

let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB;

// throw an error, if mongodb uri is not found
if (!uri) throw new Error("Please add your Mongo URI to env variables");

// for the livetime of the app, we don't want to keep connecting and connecting
// we'll try to cache our connetion
let cachedClient = null;
let cachedDb = null;

// we'll export our collections here, once connection is established
// const collections = async (db) => {
const collections = (db) => {
  const Greetings = db.collection("greetings");
  const Suggestions = db.collection("suggestions");
  const Profiles = db.collection("profiles");

  return {
    Greetings,
    Suggestions,
    Profiles,
  };
};

async function connectToDatabase() {
  // async function connectToDatabase() {
  // check if we've cached a connection previously, if so use cached connection
  if (cachedClient && cachedDb) return await collections(cachedDb);

  // create new MongoDB connection
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // create a new database instance, using dbname passed in the MongoDB URI
  const db = await client.db(dbName);

  // store connection instance in cache
  cachedClient = client;
  cachedDb = db;

  // return list of available connections
  // return await collections(db);
  return collections(db);
}

export default connectToDatabase;

// if you're still confused about the connecting MongoDB to Next.js
// visit https://github.com/kukicado/nextjs-with-mongodb github repo,
// and a post by the author - Ado Kukic
// https://www.mongodb.com/developer/how-to/nextjs-with-mongodb/
