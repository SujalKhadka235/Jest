import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { booksTable } from "../../db/schema.js";
import { getBookById } from "./getBookbyId.service.js";
export const deleteBookbyId = async (book_id) => {
    await getBookById(book_id);
    return await db.delete(booksTable).where(eq(booksTable.id, book_id));
};
