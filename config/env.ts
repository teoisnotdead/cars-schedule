import { config } from "../deps.ts";

const env = {
  MONGO_URI: Deno.env.get("MONGO_URI") || config().MONGO_URI,
  DB_NAME: Deno.env.get("DB_NAME") || config().DB_NAME,
  PORT: parseInt(Deno.env.get("PORT") || config().PORT || "8000"),
};

export default env;
