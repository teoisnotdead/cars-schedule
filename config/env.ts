import { config } from "../deps.ts";

const env = config();

export default {
  MONGO_URI: env.MONGO_URI,
  DB_NAME: env.DB_NAME,
  PORT: parseInt(env.PORT || "8000"),
};
