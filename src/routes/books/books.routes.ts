import express from "express";
import { Request, Response, NextFunction } from "express";
import { verifyAuthorToken } from "../../middleware/authors/verifyAuthorToken.middleware.js";
import { createBook } from "../../controllers/books/createBook.controller.js";
import { getAllBooks } from "../../controllers/books/getAllBooks.controller.js";
import { verifyUserToken } from "../../middleware/users/verifyUserToken.middleware.js";
import { createBookCategory } from "../../controllers/books/createBookCategory.controller.js";
import { updateBookTitle } from "../../controllers/books/updateBookTitle.controller.js";
import { deleteBook } from "../../controllers/books/deleteBook.controller.js";
import { assignCategoryToBook } from "../../controllers/books/assignCategoryToBook.controller.js";
import { removeCategoryFromBook } from "../../controllers/books/removeCategoryFromBook.controller.js";
import { rentBook } from "../../controllers/books/rentBook.controller.js";
import { returnBook } from "../../controllers/books/returnBook.controller.js";

const router = express.Router();

/**
 * @openapi
 * /books/create:
 *   post:
 *     tags:
 *       - Books
 *     summary: Create a new book
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Validation error
 */
router.post(
  "/create",
  (req: Request, res: Response, next: NextFunction) =>
    verifyAuthorToken(req, res, next),
  (req: Request, res: Response) => {
    createBook(req, res);
  }
);

/**
 * @openapi
 * /books/all:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: A list of books
 */
router.get("/all", (req: Request, res: Response) => {
  getAllBooks(req, res);
});

/**
 * @openapi
 * /books/addCategory:
 *   post:
 *     tags:
 *       - Books
 *     summary: Add a new book category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category
 *             properties:
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book category added successfully
 *       400:
 *         description: Validation error
 */
router.post(
  "/addCategory",
  (req: Request, res: Response, next: NextFunction) =>
    verifyAuthorToken(req, res, next),
  (req: Request, res: Response) => {
    createBookCategory(req, res);
  }
);

/**
 * @openapi
 * /books/update-title/{id}:
 *   put:
 *     tags:
 *       - Books
 *     summary: Update a book's title
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book title updated successfully
 *       400:
 *         description: Validation error
 */
router.put(
  "/update-title/:id",
  (req: Request, res: Response, next: NextFunction) =>
    verifyAuthorToken(req, res, next),
  (req: Request, res: Response) => {
    updateBookTitle(req, res);
  }
);

/**
 * @openapi
 * /books/delete/{id}:
 *   delete:
 *     tags:
 *       - Books
 *     summary: Delete a book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       400:
 *         description: Validation error
 */
router.delete(
  "/delete/:id",
  (req: Request, res: Response, next: NextFunction) =>
    verifyAuthorToken(req, res, next),
  (req: Request, res: Response) => {
    deleteBook(req, res);
  }
);

/**
 * @openapi
 * /books/rent/{id}:
 *   post:
 *     tags:
 *       - Books
 *     summary: Rent a book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book rented successfully
 *       400:
 *         description: Validation error
 */
router.post(
  "/rent/:id",
  (req: Request, res: Response, next: NextFunction) =>
    verifyUserToken(req, res, next),
  (req: Request, res: Response) => {
    rentBook(req, res);
  }
);

/**
 * @openapi
 * /books/return/{id}:
 *   post:
 *     tags:
 *       - Books
 *     summary: Return a rented book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Validation error
 */
router.post(
  "/return/:id",
  (req: Request, res: Response, next: NextFunction) =>
    verifyUserToken(req, res, next),
  (req: Request, res: Response) => {
    returnBook(req, res);
  }
);

export default router;
