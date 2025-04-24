import { db } from "../../db/client.js";
import { bookCategoriesTable } from "../../db/schema.js";
export const addBookCategory = async (category_name) => {
    return await db
        .insert(bookCategoriesTable)
        .values({ category: category_name.toLowerCase() });
};
