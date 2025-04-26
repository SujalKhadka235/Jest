import express from "express";
import { verifyAuthorToken } from "../../middleware/authors/verifyAuthorToken.middleware.js";
import { createBook } from "../../controllers/books/createBook.controller.js";
import { getAllBooks } from "../../controllers/books/getAllBooks.controller.js";
import { createBookCategory } from "../../controllers/books/createBookCategory.controller.js";
import { updateBookTitle } from "../../controllers/books/updateBookTitle.controller.js";
import { deleteBook } from "../../controllers/books/deleteBook.controller.js";
import { assignCategoryToBook } from "../../controllers/books/assignCategoryToBook.controller.js";
import { removeCategoryFromBook } from "../../controllers/books/removeCategoryFromBook.controller.js";
const router = express.Router();
router.post("/create", (req, res, next) => verifyAuthorToken(req, res, next), (req, res) => {
    createBook(req, res);
});
router.get("/all", (req, res) => {
    getAllBooks(req, res);
});
router.post("/addCategory", (req, res, next) => verifyAuthorToken(req, res, next), (req, res) => {
    createBookCategory(req, res);
});
router.put("/update-title/:id", (req, res, next) => verifyAuthorToken(req, res, next), (req, res) => {
    updateBookTitle(req, res);
});
router.delete("/delete/:id", (req, res, next) => verifyAuthorToken(req, res, next), (req, res) => {
    deleteBook(req, res);
});
router.put("/add-category/:id", (req, res, next) => verifyAuthorToken(req, res, next), (req, res) => {
    assignCategoryToBook(req, res);
});
router.put("/remove-category/:id", (req, res, next) => verifyAuthorToken(req, res, next), (req, res) => {
    removeCategoryFromBook(req, res);
});
export default router;
