import { db } from "../../db/client.js";
import { usersTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
export const getUserById = async (id: number) => {
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));
  if (existingUser.length === 0) {
    throw new Error("userId provided does not exist");
  }
  return existingUser[0];
};
