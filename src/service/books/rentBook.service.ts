import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { booksTable } from "../../db/schema.js";
import { getUserById } from "../user/getUserById.service.js";
import { getBookById } from "./getBookbyId.service.js";

export const rentBookService = async (book_id: number, userId: number) => {
  await getUserById(userId);
  const book = await getBookById(book_id);
  if (book.statusId === 2) {
    throw new Error("Book is already rented and not availabe");
  }
  return await db
    .update(booksTable)
    .set({ userId: userId, statusId: 2 })
    .where(eq(booksTable.id, book_id));
};
