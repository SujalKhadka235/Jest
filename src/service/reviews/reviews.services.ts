import { db } from "../../db/client.js";
import {
  reviewsAuthorTable,
  reviewsBookTable,
  booksTable,
  authorsTable,
  usersTable,
} from "../../db/schema.js";

import { eq } from "drizzle-orm";
import { getUserById } from "../user/getUserById.service.js";
import { getBookById } from "../books/getBookbyId.service.js";
import { getAuthorById } from "../authors/getAuthorById.service.js";

export const createBookReviewService = async (
  userId: number,
  bookId: number,
  rating: number,
  comment: string
) => {
  await getUserById(userId);
  await getBookById(bookId);

  return await db.insert(reviewsBookTable).values({
    userId,
    bookId,
    rating,
    comment,
  });
};

export const getBookReviewsService = async (bookId: number) => {
  await getBookById(bookId);

  const reviews = await db
    .select()
    .from(reviewsBookTable)
    .where(eq(reviewsBookTable.bookId, bookId));
  return reviews;
};

export const createAuthorReviewService = async (
  userId: number,
  authorId: number,
  rating: number,
  comment: string
) => {
  await getUserById(userId);
  await getAuthorById(authorId);

  await db.insert(reviewsAuthorTable).values({
    userId,
    authorId,
    rating,
    comment,
  });
};

export const getAuthorReviewsService = async (authorId: number) => {
  await getAuthorById(authorId);

  const reviews = await db
    .select()
    .from(reviewsAuthorTable)
    .where(eq(reviewsAuthorTable.authorId, authorId));
  return reviews;
};
