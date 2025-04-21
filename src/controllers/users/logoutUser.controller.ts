import { error } from "console";
import { Request, Response } from "express";
import { z } from "zod";
import { db } from "../../db/client.js";
import { badTokensTable } from "../../db/schema.js";
import { logoutUserService } from "../../service/user/logoutUser.service.js";

export const logoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const header = req.headers.authorization || req.headers.Authorization;
    if (typeof header !== "string") {
      res.status(400).json({ msg: "invalid header type" });
      return;
    }
    if (!header.toLocaleLowerCase().startsWith("bearer ")) {
      res.status(400).json({ msg: "invalid header " });
      return;
    }
    const token = header.split(" ")[1];
    await logoutUserService(token);
    res.status(200).json({ msg: "logged out successfully" });
    return;
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    return;
  }
};
