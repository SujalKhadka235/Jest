import { db } from "../../db/client.js";
import { reviewsAuthorTable, reviewsBookTable, } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { getUserById } from "../user/getUserById.service.js";
import { getBookById } from "../books/getBookbyId.service.js";
import { getAuthorById } from "../authors/getAuthorById.service.js";
export const createBookReviewService = async (userId, bookId, rating, comment) => {
    await getUserById(userId);
    await getBookById(bookId);
    return await db.insert(reviewsBookTable).values({
        userId,
        bookId,
        rating,
        comment,
    });
};
export const getBookReviewsService = async (bookId) => {
    await getBookById(bookId);
    const reviews = await db
        .select()
        .from(reviewsBookTable)
        .where(eq(reviewsBookTable.bookId, bookId));
    return reviews;
};
export const createAuthorReviewService = async (userId, authorId, rating, comment) => {
    await getUserById(userId);
    await getAuthorById(authorId);
    await db.insert(reviewsAuthorTable).values({
        userId,
        authorId,
        rating,
        comment,
    });
};
export const getAuthorReviewsService = async (authorId) => {
    await getAuthorById(authorId);
    const reviews = await db
        .select()
        .from(reviewsAuthorTable)
        .where(eq(reviewsAuthorTable.authorId, authorId));
    return reviews;
};
