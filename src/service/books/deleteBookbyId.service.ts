import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { booksTable } from "../../db/schema.js";
import { getBookById } from "./getBookbyId.service.js";
import { bookToCategoryTable } from "../../db/schema.js";
export const deleteBookbyIdService = async (book_id: number) => {
  await getBookById(book_id);
  return await db.transaction(async (tx) => {
    await tx
      .delete(bookToCategoryTable)
      .where(eq(bookToCategoryTable.bookId, book_id));
    return await tx.delete(booksTable).where(eq(booksTable.id, book_id));
  });
};
