import { mysqlTable, int, varchar, date } from "drizzle-orm/mysql-core";
// export const bookStatus = ["borrowed", "availabe"] as const;
// export type BookStatus = (typeof bookStatus)[number];
export const usersTable = mysqlTable("users", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    password: varchar("password", { length: 255 }).notNull(),
});
export const booksTable = mysqlTable("books", {
    id: int("id").primaryKey().autoincrement(),
    title: varchar("title", { length: 255 }).notNull(),
    issuedDate: date("issuedDate").default(new Date()),
    authorId: int("authorId")
        .notNull()
        .references(() => authorsTable.id),
    userId: int("userId").references(() => usersTable.id),
    statusId: int("statusId").references(() => bookStatusTable.id),
});
export const authorsTable = mysqlTable("authors", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
});
export const badTokensTable = mysqlTable("badTokens", {
    id: int("id").primaryKey().autoincrement(),
    token: varchar("token", { length: 255 }).notNull().unique(),
});
export const reviewsBookTable = mysqlTable("reviewsBook", {
    id: int("id").primaryKey().autoincrement(),
    userId: int("userId")
        .notNull()
        .references(() => usersTable.id),
    bookId: int("bookId")
        .notNull()
        .references(() => booksTable.id),
    rating: int("rating").notNull(),
    comment: varchar("comment", { length: 1000 }),
    createdAt: date("createdAt").default(new Date()),
});
export const reviewsAuthorTable = mysqlTable("reviewsAuthor", {
    id: int("id").primaryKey().autoincrement(),
    userId: int("userId")
        .notNull()
        .references(() => usersTable.id),
    authorId: int("authorId")
        .notNull()
        .references(() => authorsTable.id),
    rating: int("rating").notNull(),
    comment: varchar("comment", { length: 1000 }),
    createdAt: date("createdAt").default(new Date()),
});
export const bookCategoriesTable = mysqlTable("bookCategories", {
    id: int("id").primaryKey().autoincrement(),
    category: varchar("category", { length: 255 }).notNull(),
});
export const bookStatusTable = mysqlTable("bookStatus", {
    id: int("id").primaryKey().autoincrement(),
    status: varchar("status", { length: 255 }).notNull(),
});
export const bookToCategoryTable = mysqlTable("bookToCategoryTable", {
    bookId: int("bookId")
        .notNull()
        .references(() => booksTable.id),
    categoryId: int("categoryId")
        .notNull()
        .references(() => bookCategoriesTable.id),
});
