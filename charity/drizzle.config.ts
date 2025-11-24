export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "sqlite",
  driver: "sqlite3",
  dbCredentials: {
    url: "dev.db",
  },
};
