import { Request, Response } from "express";
import { z } from "zod";
import {
  createBookReviewService,
  getBookReviewsService,
  createAuthorReviewService,
  getAuthorReviewsService,
} from "../../service/reviews/reviews.services.js";

const createBookReviewSchema = z.object({
  bookId: z.number(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(1000),
});

const createAuthorReviewSchema = z.object({
  authorId: z.number(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(1000),
});

export const createBookReview = async (
  req: any,
  res: Response
): Promise<void> => {
  const parsed = createBookReviewSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ msg: "Invalid request" });
    return;
  }

  try {
    const { bookId, rating, comment } = parsed.data;
    const userId = req.user._id;
    await createBookReviewService(userId, bookId, rating, comment);
    res.status(201).json({ message: "Book review created successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookReviews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { bookId } = req.params;
    const reviews = await getBookReviewsService(Number(bookId));
    res.status(200).json({ reviews });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createAuthorReview = async (
  req: any,
  res: Response
): Promise<void> => {
  const parsed = createAuthorReviewSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ msg: "Invalid request" });
    return;
  }

  try {
    const { authorId, rating, comment } = parsed.data;
    const userId = req.user._id;
    await createAuthorReviewService(userId, authorId, rating, comment);
    res.status(201).json({ message: "Author review created successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAuthorReviews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { authorId } = req.params;
    const reviews = await getAuthorReviewsService(Number(authorId));
    res.status(200).json({ reviews });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
