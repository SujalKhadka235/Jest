import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { authorsTable } from "../../db/schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const loginAuthorService = async (email, password) => {
    const existingAuthor = await db
        .select()
        .from(authorsTable)
        .where(eq(authorsTable.email, email));
    if (existingAuthor.length === 0) {
        throw new Error("author does not exist");
    }
    const doesPasswordMatch = await bcrypt.compare(password, existingAuthor[0].password);
    if (!doesPasswordMatch) {
        throw new Error("password does not match");
    }
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ _author_id: existingAuthor[0].id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
    return token;
};
