import { Request, RequestHandler, Response } from "express";
import { getAllUsersService } from "../../service/user/getAllUsers.service.js";
import { createUserService } from "../../service/user/createUser.service.js";
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUsersService();
    if (users.length === 0) {
      res.status(200).json({ msg: "No users in the database at the moment" });
      return;
    }
    res.status(200).json({ users: users });
  } catch (err: any) {
    res.status(500).json({ msg: "Error", err: err.message });
  }
};
