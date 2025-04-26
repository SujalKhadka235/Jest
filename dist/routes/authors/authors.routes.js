import express from "express";
import { createAuthor } from "../../controllers/authors/createAuthor.controller.js";
import { loginAuthor } from "../../controllers/authors/loginAuthor.controller.js";
import { verifyAuthorToken } from "../../middleware/authors/verifyAuthorToken.middleware.js";
import { logoutAuthor } from "../../controllers/authors/logoutAuthor.controller.js";
const router = express.Router();
router.post("/create", (req, res) => {
    createAuthor(req, res);
});
router.post("/login", (req, res) => {
    loginAuthor(req, res);
});
router.post("/logout", (req, res, next) => verifyAuthorToken(req, res, next), (req, res) => {
    logoutAuthor(req, res);
});
export default router;
