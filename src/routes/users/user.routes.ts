import express, { NextFunction, Request, Response, Router } from "express";

import { getAllUsers } from "../../controllers/users/getAllUsers.controller.js";
import { createUser } from "../../controllers/users/createUser.controller.js";
import { loginUser } from "../../controllers/users/loginUser.controller.js";
import { logoutUser } from "../../controllers/users/logoutUser.controller.js";
import { verifyUserToken } from "../../middleware/users/verifyUserToken.middleware.js";
import { updateUserName } from "../../controllers/users/updateUserName.controller.js";
import { deleteUser } from "../../controllers/users/deleteUser.controller.js";
const router: Router = express.Router();
/**
 * @openapi
 * /users/all:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 */

router.get("/all", (req: Request, res: Response) => getAllUsers(req, res));
/**
 * @openapi
 * /users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or user already exists
 */

router.post("/register", (req: Request, res: Response) => createUser(req, res));
/**
 * @openapi
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Login a user
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
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", (req: Request, res: Response) => loginUser(req, res));
/**
 * @openapi
 * /users/logout:
 *   post:
 *     tags:
 *       - Users
 *     summary: Log out the user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Invalid or missing token
 */

router.post(
  "/logout",
  (req: Request, res: Response, next: NextFunction) =>
    verifyUserToken(req, res, next),
  (req: Request, res: Response) => logoutUser(req, res)
);
/**
 * @openapi
 * /users/change-name:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update the user's name
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Name
 *     responses:
 *       200:
 *         description: Username updated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */

router.put(
  "/change-name",
  (req: Request, res: Response, next: NextFunction) =>
    verifyUserToken(req, res, next),
  (req: Request, res: Response) => updateUserName(req, res)
);
/**
 * @swagger
 * /users/delete-user:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user account after verifying password and JWT token.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: yourPassword123
 *     responses:
 *       200:
 *         description: User successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: User successfully deleted
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete(
  "/delete-user",
  (req: Request, res: Response, next: NextFunction) =>
    verifyUserToken(req, res, next),
  (req: Request, res: Response) => deleteUser(req, res)
);

export default router;
