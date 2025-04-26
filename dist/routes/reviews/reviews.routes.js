import { Router } from "express";
import { createBookReview, getBookReviews, createAuthorReview, getAuthorReviews, } from "../../controllers/reviews/reviews.controller.js";
import { verifyUserToken } from "../../middleware/users/verifyUserToken.middleware.js";
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Book and Author reviews management
 */
/**
 * @swagger
 * /reviews/book:
 *   post:
 *     summary: Create a review for a book
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - rating
 *               - comment
 *             properties:
 *               bookId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book review created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post("/book", verifyUserToken, createBookReview);
/**
 * @swagger
 * /reviews/book/{bookId}:
 *   get:
 *     summary: Get all reviews for a specific book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: List of reviews
 *       404:
 *         description: Book not found
 */
router.get("/book/:bookId", getBookReviews);
/**
 * @swagger
 * /reviews/author:
 *   post:
 *     summary: Create a review for an author
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorId
 *               - rating
 *               - comment
 *             properties:
 *               authorId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Author review created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post("/author", verifyUserToken, createAuthorReview);
/**
 * @swagger
 * /reviews/author/{authorId}:
 *   get:
 *     summary: Get all reviews for a specific author
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: authorId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the author
 *     responses:
 *       200:
 *         description: List of reviews
 *       404:
 *         description: Author not found
 */
router.get("/author/:authorId", getAuthorReviews);
export default router;
