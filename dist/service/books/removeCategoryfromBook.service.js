import { getBookById } from "./getBookbyId.service.js";
import { getCategoryIdByName } from "./getCategoryidByname.service.js";
import { db } from "../../db/client.js";
import { eq } from "drizzle-orm";
import { and } from "drizzle-orm";
import { bookToCategoryTable } from "../../db/schema.js";
export const removeCategoryFromBookService = async (book_id, category) => {
    await getBookById(book_id);
    const category_id = await getCategoryIdByName(category);
    return await db
        .delete(bookToCategoryTable)
        .where(and(eq(bookToCategoryTable.bookId, book_id), eq(bookToCategoryTable.categoryId, category_id)));
};
