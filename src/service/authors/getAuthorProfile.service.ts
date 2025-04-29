import { db } from "../../db/client.js";
import { booksTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { getAuthorById } from "./getAuthorById.service.js";
import { getAuthorReviewsService } from "../reviews/reviews.services.js";

export const getAuthorProfileService = async (author_id: number) => {
  const author = await getAuthorById(author_id);
  if (!author) {
    throw new Error("Author not found");
  }

  const booksFromAuthor = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.authorId, author.id));

  const authorReviews = await getAuthorReviewsService(author.id);

  const averageRating =
    authorReviews.length > 0
      ? Math.ceil(
          authorReviews.reduce((sum, review) => sum + review.rating, 0) /
            authorReviews.length
        )
      : null;

  return {
    authorName: author.name,
    books: booksFromAuthor,
    reviews: authorReviews,
    averageRating,
  };
};
