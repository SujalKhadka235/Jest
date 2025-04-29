import express from "express";
import { createAuthor } from "../../controllers/authors/createAuthor.controller.js";
import { loginAuthor } from "../../controllers/authors/loginAuthor.controller.js";
import { verifyAuthorToken } from "../../middleware/authors/verifyAuthorToken.middleware.js";
import { logoutAuthor } from "../../controllers/authors/logoutAuthor.controller.js";
import { getAuthorProfile } from "../../controllers/authors/getAuthorProfile.controller.js";
const router = express.Router();
/**
 * @openapi
 * /authors/create:
 *   post:
 *     tags:
 *       - Authors
 *     summary: Create a new author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Validation error
 */
router.post("/create", (req, res) => {
    createAuthor(req, res);
});
/**
 * @openapi
 * /authors/login:
 *   post:
 *     tags:
 *       - Authors
 *     summary: Login an author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Author logged in successfully
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", (req, res) => {
    loginAuthor(req, res);
});
/**
 * @openapi
 * /authors/logout:
 *   post:
 *     tags:
 *       - Authors
 *     summary: Logout an author
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Author logged out successfully
 *       401:
 *         description: Invalid or missing token
 */
router.post("/logout", (req, res, next) => verifyAuthorToken(req, res, next), (req, res) => {
    logoutAuthor(req, res);
});
router.post("/profile", (req, res, next) => verifyAuthorToken(req, res, next), (req, res) => {
    getAuthorProfile(req, res);
});
export default router;
