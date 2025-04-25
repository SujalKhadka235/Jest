import { db } from "../../db/client.js";
import { booksTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { getBookByTitleService } from "./getBookByTitle.service.js";
export const deleteBookByTitleService = async (title: string) => {
  await getBookByTitleService(title);
  await db.delete(booksTable).where(eq(booksTable.title, title));
  return;
};
