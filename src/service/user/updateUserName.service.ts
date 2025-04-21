import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { usersTable } from "../../db/schema.js";

export const updateUserNameService = async (
  userId: number,
  updatedName: string
) => {
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId));
  if (existingUser.length === 0) {
    throw new Error("invalid token");
  }
  await db
    .update(usersTable)
    .set({ name: updatedName })
    .where(eq(usersTable.id, userId));
};
