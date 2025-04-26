import { db } from "../../db/client.js";
import { booksTable } from "../../db/schema.js";
import { getAuthorById } from "../authors/getAuthorById.service.js";

export const addBookService = async (title: string, authorId: number) => {
  const existingAuthor = await getAuthorById(authorId);
  if (!existingAuthor) {
    throw new Error("Error");
  }
  const createdbookId = await db
    .insert(booksTable)
    .values({ title, authorId, statusId: 1 })
    .$returningId();
  return createdbookId[0].id;
};
