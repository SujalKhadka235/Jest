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
router.post(
  "/create",
  (req: Request, res: Response, next: NextFunction) =>
    verifyAuthorToken(req, res, next),
  (req: Request, res: Response) => {
    createBook(req, res);
  }
);
router.get("/all", (req: Request, res: Response) => {
  getAllBooks(req, res);
});
router.post(
  "/addCategory",
  (req: Request, res: Response, next: NextFunction) =>
    verifyAuthorToken(req, res, next),
  (req: Request, res: Response) => {
    createBookCategory(req, res);
  }
);
router.put(
  "/update-title/:id",
  (req: Request, res: Response, next: NextFunction) =>
    verifyAuthorToken(req, res, next),
  (req: Request, res: Response) => {
    updateBookTitle(req, res);
  }
);
router.delete(
  "/delete/:id",
  (req: Request, res: Response, next: NextFunction) =>
    verifyAuthorToken(req, res, next),
  (req: Request, res: Response) => {
    deleteBook(req, res);
  }
);
router.put(
  "/add-category/:id",
  (req: Request, res: Response, next: NextFunction) =>
    verifyAuthorToken(req, res, next),
  (req: Request, res: Response) => {
    assignCategoryToBook(req, res);
  }
);
router.put(
  "/remove-category/:id",
  (req: Request, res: Response, next: NextFunction) =>
    verifyAuthorToken(req, res, next),
  (req: Request, res: Response) => {
    removeCategoryFromBook(req, res);
  }
);
router.post(
  "/rent/:id",
  (req: Request, res: Response, next: NextFunction) =>
    verifyUserToken(req, res, next),
  (req: Request, res: Response) => {
    rentBook(req, res);
  }
);
router.post(
  "/return/:id",
  (req: Request, res: Response, next: NextFunction) =>
    verifyUserToken(req, res, next),
  (req: Request, res: Response) => {
    returnBook(req, res);
  }
);

export default router;
