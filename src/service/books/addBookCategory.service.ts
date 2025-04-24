import { db } from "../../db/client.js";
import { bookCategoriesTable } from "../../db/schema.js";

export const addBookCategory = async (category_name: string) => {
  return await db
    .insert(bookCategoriesTable)
    .values({ category: category_name.toLowerCase() });
};
