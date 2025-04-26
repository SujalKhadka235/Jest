import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { booksTable } from "../../db/schema.js";
import { getBookById } from "./getBookbyId.service.js";

export const returnBookService = async (book_id: number, userId: number) => {
  const book = await getBookById(book_id);
  if (book.statusId !== 2) {
    throw new Error("This book has not been rented");
  }
  if (book.userId !== userId) {
    throw new Error("user id provided is not the one who rented this book");
  }
  return await db
    .update(booksTable)
    .set({ userId: null, statusId: 1 })
    .where(eq(booksTable.id, book_id));
};
