import express from "express";
import { verifyUserToken } from "../../middleware/users/verifyUserToken.middleware.js";
import { createBook } from "../../controllers/books/createBook.controller.js";
const router = express.Router();
router.post("/create", (req, res, next) => verifyUserToken(req, res, next), (req, res) => {
    createBook(req, res);
});
export default router;
