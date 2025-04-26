import express from "express";
import { Request, Response, NextFunction } from "express";
import { verifyUserToken } from "../../middleware/users/verifyUserToken.middleware.js";
import { createBook } from "../../controllers/books/createBook.controller.js";
const router = express.Router();
router.post(
  "/create",
  (req: Request, res: Response, next: NextFunction) =>
    verifyUserToken(req, res, next),
  (req: Request, res: Response) => {
    createBook(req, res);
  }
);
export default router;
