import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { booksTable } from "../../db/schema.js";

export const getAvailableBooksService = async () => {
  const availableBooks = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.statusId, 1));
  if (availableBooks.length === 0) {
    throw new Error("No books are available currently sorry");
  }
  return availableBooks;
};
