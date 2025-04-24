import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { bookCategoriesTable } from "../../db/schema.js";
export const getCategoryIdByName = async (name) => {
    const category = await db
        .select()
        .from(bookCategoriesTable)
        .where(eq(bookCategoriesTable.category, name.toLowerCase()));
    if (category.length === 0) {
        throw new Error("category does not exist");
    }
    return category[0].id;
};
