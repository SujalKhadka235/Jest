import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { booksTable } from "../../db/schema.js";
export const getBookByTitleService = async (title) => {
    const book = await db
        .select()
        .from(booksTable)
        .where(eq(booksTable.title, title));
    if (book.length === 0) {
        throw new Error("book with name does not exist");
    }
    return book[0];
};
