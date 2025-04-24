import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { usersTable } from "../../db/schema.js";
import { getUserById } from "./getUserById.service.js";

export const deleteUserService = async (userId: number) => {
  return await db.delete(usersTable).where(eq(usersTable.id, userId));
};
