import { db } from "../../db/client.js";
import { booksTable } from "../../db/schema.js";
export const getAllBooksService = async () => {
    const books = await db.select().from(booksTable);
    if (books.length === 0) {
        throw new Error("currently no books availabe");
    }
    return books;
};
