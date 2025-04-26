import express from "express";
import { Request, Response, NextFunction } from "express";
import { createAuthor } from "../../controllers/authors/createAuthor.controller.js";
import { loginAuthor } from "../../controllers/authors/loginAuthor.controller.js";
import { verifyAuthorToken } from "../../middleware/authors/verifyAuthorToken.middleware.js";
import { logoutAuthor } from "../../controllers/authors/logoutAuthor.controller.js";
const router = express.Router();
router.post("/create", (req: Request, res: Response) => {
  createAuthor(req, res);
});
router.post("/login", (req: Request, res: Response) => {
  loginAuthor(req, res);
});
router.post(
  "/logout",
  (req: Request, res: Response, next: NextFunction) =>
    verifyAuthorToken(req, res, next),
  (req: Request, res: Response) => {
    logoutAuthor(req, res);
  }
);
export default router;
