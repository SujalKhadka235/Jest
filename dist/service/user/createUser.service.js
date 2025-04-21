import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { usersTable } from "../../db/schema.js";
import bcrypt from "bcryptjs";
export const createUserService = async (name, email, password) => {
    try {
        const isEmailAlreadyTaken = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));
        if (isEmailAlreadyTaken.length > 0) {
            throw new Error("Email is already taken");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUserId = await db
            .insert(usersTable)
            .values({ name, email, password: hashedPassword })
            .$returningId();
        return createdUserId;
    }
    catch (err) {
        throw new Error(`Error: ${err.message}`);
    }
};
