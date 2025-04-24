import { db } from "../../db/client.js";
import { booksTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
export const getBookById = async (book_id: number) => {
  const book = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.id, book_id));
  if (book.length === 0) {
    throw new Error("book of this id does not exist");
  }
  return book[0];
};
