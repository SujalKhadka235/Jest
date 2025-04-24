import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { usersTable } from "../../db/schema.js";
export const deleteUserService = async (userId) => {
    return await db.delete(usersTable).where(eq(usersTable.id, userId));
};
