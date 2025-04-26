import { db } from "../../db/client.js";
import { bookToCategoryTable } from "../../db/schema.js";
import { getCategoryIdByName } from "./getCategoryidByname.service.js";
import { eq } from "drizzle-orm";
import { booksTable } from "../../db/schema.js";
import { inArray } from "drizzle-orm";
export const getBooksByCategoryService = async (category) => {
    const category_id = await getCategoryIdByName(category);
    const bookIds = await db
        .select({ bookId: bookToCategoryTable.bookId })
        .from(bookToCategoryTable)
        .where(eq(bookToCategoryTable.categoryId, category_id));
    const ids = bookIds.map((book) => book.bookId);
    if (ids.length === 0) {
        throw new Error("No books found in this category");
    }
    const books = await db
        .select()
        .from(booksTable)
        .where(inArray(booksTable.id, ids));
    return books;
};
