import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { db } from "../../db/client.js";
import { badTokensTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export const verifyUserToken = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const header = req.headers.authorization || req.headers.Authorization;

  if (!header || typeof header !== "string") {
    res.status(401).json({ msg: "No token provided" });
    return;
  }

  if (!header.toLowerCase().startsWith("bearer ")) {
    res.status(400).json({ msg: "Invalid authorization header format" });
    return;
  }

  const token = header.split(" ")[1];
  if (!token) {
    res.status(400).json({ msg: "Token not found" });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    res
      .status(500)
      .json({ msg: "Server misconfiguration: JWT_SECRET missing" });
    return;
  }

  try {
    const isBlacklisted = await db
      .select()
      .from(badTokensTable)
      .where(eq(badTokensTable.token, token));

    if (isBlacklisted.length > 0) {
      res.status(401).json({ msg: "Token has been logged out" });
      return;
    }

    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid or expired token" });
    return;
  }
};
