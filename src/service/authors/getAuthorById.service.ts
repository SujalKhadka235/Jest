import { db } from "../../db/client.js";
import { authorsTable, usersTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
export const getAuthorById = async (id: number) => {
  const existingAuthor = await db
    .select()
    .from(authorsTable)
    .where(eq(authorsTable.id, id));
  if (existingAuthor.length === 0) {
    throw new Error("author id provided does not exist");
  }
  return existingAuthor[0];
};
