import { db } from "../../db/client.js";
import { usersTable } from "../../db/schema.js";

export const getAllUsersService = async () => {
  try {
    const allUsers = await db.select().from(usersTable);
    return allUsers;
  } catch (err: any) {
    throw new Error(`Error: ${err.message}`);
  }
};
