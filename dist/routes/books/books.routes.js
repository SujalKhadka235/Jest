import express from "express";
import { verifyAuthorToken } from "../../middleware/authors/verifyAuthorToken.middleware.js";
import { createBook } from "../../controllers/books/createBook.controller.js";
import { getAllBooks } from "../../controllers/books/getAllBooks.controller.js";
import { verifyUserToken } from "../../middleware/users/verifyUserToken.middleware.js";
import { createBookCategory } from "../../controllers/books/createBookCategory.controller.js";
import { updateBookTitle } from "../../controllers/books/updateBookTitle.controller.js";
import { deleteBook } from "../../controllers/books/deleteBook.controller.js";
import { rentBook } from "../../controllers/books/rentBook.controller.js";
import { returnBook } from "../../controllers/books/returnBook.controller.js";
import { getAvailableBooks } from "../../controllers/books/getAvailableBooks.controller.js";
import { getBooksByCategory } from "../../controllers/books/getBooksByCategory.Controller.js";
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
router.post("/create", (req, res, next) => verifyAuthorToken(req, res, next), (req, res) => {
    createBook(req, res);
});
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
router.get("/all", (req, res) => {
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
router.post("/addCategory", (req, res, next) => verifyAuthorToken(req, res, next), (req, res) => {
    createBookCategory(req, res);
});
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
router.put("/update-title/:id", (req, res, next) => verifyAuthorToken(req, res, next), (req, res) => {
    updateBookTitle(req, res);
});
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
router.delete("/delete/:id", (req, res, next) => verifyAuthorToken(req, res, next), (req, res) => {
    deleteBook(req, res);
});
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
router.post("/rent/:id", (req, res, next) => verifyUserToken(req, res, next), (req, res) => {
    rentBook(req, res);
});
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
router.post("/return/:id", (req, res, next) => verifyUserToken(req, res, next), (req, res) => {
    returnBook(req, res);
});
router.get("/available", (req, res) => {
    getAvailableBooks(req, res);
});
router.get("/allBooksByCategory", (req, res) => {
    getBooksByCategory(req, res);
});
export default router;
