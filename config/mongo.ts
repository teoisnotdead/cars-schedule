import { MongoClient } from "../deps.ts";
import env from "./env.ts";

// Crear cliente de MongoDB
const client = new MongoClient(env.MONGO_URI);

try {
  console.log("Connecting to MongoDB...");
  await client.connect();
  console.log("Connected to MongoDB successfully!");
} catch (e) {
  console.error("MongoDB connection error:", e.message);
  throw e;
}

// Conexión a la base de datos
const db = client.db(env.DB_NAME);

export { db, client };
