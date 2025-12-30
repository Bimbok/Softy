import { MongoClient, type Db } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db("softy");

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
