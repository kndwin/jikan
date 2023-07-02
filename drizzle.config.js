import dotenv from 'dotenv'
dotenv.config()

/** @type { import("drizzle-kit").Config } */

const url = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

console.log({ url, authToken});
const config = {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: { url, authToken }
};
export default config;
