import jwt from "jsonwebtoken";
import { db } from "../../db/client.js";
import { badTokensTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
export const verifyAuthorToken = async (req, res, next) => {
    const header = req.headers.authorization || req.headers.Authorization;
    if (!header || typeof header !== "string" || !header.startsWith("Bearer ")) {
        res.status(401).json({ msg: "No token provided or invalid token" });
        return;
    }
    const token = header.split(" ")[1];
    if (!token) {
        throw new Error("Token not found in header");
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT secret missing");
    }
    try {
        const isBlacklisted = await db
            .select()
            .from(badTokensTable)
            .where(eq(badTokensTable.token, token));
        if (isBlacklisted.length > 0) {
            throw new Error("Token has been logged out");
        }
        const decoded = jwt.verify(token, jwtSecret);
        req.author = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ msg: err.message });
        return;
    }
};
