import express, { Request, Response, Router } from "express";

import { getAllUsers } from "../../controllers/users/getAllUsers.controller.js";
import { createUser } from "../../controllers/users/createUser.controller.js";
const router: Router = express.Router();
router.get("/all", (req: Request, res: Response) => getAllUsers(req, res));
router.post("/register", (req: Request, res: Response) => createUser(req, res));
export default router;
