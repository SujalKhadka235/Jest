import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { booksTable } from "../../db/schema.js";
import { getBookById } from "./getBookbyId.service.js";
export const updateBookTitleService = async (title, book_id) => {
    await getBookById(book_id);
    await db
        .update(booksTable)
        .set({ title: title })
        .where(eq(booksTable.id, book_id));
};
