import { db } from "../../db/client.js";
import { bookToCategoryTable } from "../../db/schema.js";
import { getBookById } from "./getBookbyId.service.js";
import { getCategoryIdByName } from "./getCategoryidByname.service.js";

export const assignCategoryToBookService = async (
  book_id: number,
  category: string
) => {
  await getBookById(book_id);
  const category_id = await getCategoryIdByName(category);
  return await db
    .insert(bookToCategoryTable)
    .values({ bookId: book_id, categoryId: category_id });
};
