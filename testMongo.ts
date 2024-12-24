import { MongoClient } from "https://deno.land/x/mongo@v0.33.0/mod.ts";

const uri = "mongodb+srv://zombie:nSYiLYAK3kKNoJs3@cluster0.fl4aj.mongodb.net/gyecars?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient();

try {
  console.log("Connecting to MongoDB...");
  await client.connect(uri);
  console.log("Connected successfully!");
} catch (e) {
  console.error("Connection failed:", e.message);
}
