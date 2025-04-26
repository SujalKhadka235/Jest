import { db } from "../../db/client.js";
import { booksTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
export const getBooksByAuthorIdService = async (author_id) => {
    const books = await db
        .select()
        .from(booksTable)
        .where(eq(booksTable.authorId, author_id));
    if (books.length === 0) {
        throw new Error("Author does not have any books");
    }
    return books;
};
