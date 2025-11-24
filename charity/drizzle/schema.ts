import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const donations = sqliteTable("donations", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  donated_at: integer("donated_at").notNull(),
  amount: integer("amount").notNull(),
  purpose: text("purpose").notNull(),

  source: text("source", {
    enum: ["dozbrajamy", "web_dev"],
  }).notNull(),

  created: integer("created").notNull(),
  modified: integer("modified").notNull(),
});
