import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { authorsTable } from "../../db/schema.js";
import bcrypt from "bcryptjs";
export const createAuthorService = async (name, email, password) => {
    const isEmailAlreadyTaken = await db
        .select()
        .from(authorsTable)
        .where(eq(authorsTable.email, email));
    if (isEmailAlreadyTaken.length > 0) {
        throw new Error("Email is already taken");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAuthorId = await db
        .insert(authorsTable)
        .values({ name, email, password: hashedPassword })
        .$returningId();
    return createdAuthorId;
};
