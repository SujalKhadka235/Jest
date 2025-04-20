import { mysqlTable, int, varchar, date } from "drizzle-orm/mysql-core";
export const bookStatus = ["rented", "available"] as const;
export type BookStatus = (typeof bookStatus)[number];
export const bookCategories = [
  "horror",
  "romance",
  "comedy",
  "adventure",
  "literature",
] as const;
export type BookCategory = (typeof bookCategories)[number];
export const usersTable = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});
export const booksTable = mysqlTable("books", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  issuedDate: date("issuedDate").default(new Date()),
  status: varchar("status", { length: 255 }).notNull(),
  authorId: int("authorId")
    .notNull()
    .references(() => authorsTable.id),
  userId: int("userId").references(() => usersTable.id),
});
export const authorsTable = mysqlTable("authors", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});
export const badTokensTable = mysqlTable("badTokens", {
  id: int("id").primaryKey().autoincrement(),
  token: varchar("token", { length: 255 }).notNull(),
});
