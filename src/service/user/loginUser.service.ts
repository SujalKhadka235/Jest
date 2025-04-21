import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { usersTable } from "../../db/schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const loginUserService = async (email: string, password: string) => {
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  if (existingUser.length === 0) {
    throw new Error("user does not exist");
  }
  const doesPasswordMatch = await bcrypt.compare(
    password,
    existingUser[0].password
  );
  if (!doesPasswordMatch) {
    throw new Error("password does not match");
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign({ _id: existingUser[0].id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
