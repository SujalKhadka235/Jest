import { db } from "../../db/client.js";
import { booksTable, bookCategoriesTable, bookToCategoryTable, } from "../../db/schema.js";
import { eq } from "drizzle-orm";
export const getAllBooksService = async () => {
    const books = await db.select().from(booksTable);
    const booksWithCategories = await Promise.all(books.map(async (book) => {
        const categories = await db
            .select({ name: bookCategoriesTable.category })
            .from(bookToCategoryTable)
            .innerJoin(bookCategoriesTable, eq(bookToCategoryTable.categoryId, bookCategoriesTable.id))
            .where(eq(bookToCategoryTable.bookId, book.id));
        const categoryNames = categories.map((c) => c.name);
        return {
            ...book,
            categories: categoryNames,
        };
    }));
    return booksWithCategories;
};
