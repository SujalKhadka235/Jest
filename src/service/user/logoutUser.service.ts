import { db } from "../../db/client.js";
import { badTokensTable } from "../../db/schema.js";

export const logoutUserService = async (token: string) => {
  if (!token) {
    throw new Error("token not provided");
  }
  await db.insert(badTokensTable).values({ token: token });
};
