import express from "express";
import { getAllUsers } from "../../controllers/users/getAllUsers.controller.js";
import { createUser } from "../../controllers/users/createUser.controller.js";
const router = express.Router();
router.get("/all", (req, res) => getAllUsers(req, res));
router.post("/register", (req, res) => createUser(req, res));
export default router;
