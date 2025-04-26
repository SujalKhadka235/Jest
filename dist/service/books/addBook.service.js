import { db } from "../../db/client.js";
import { booksTable } from "../../db/schema.js";
import { getAuthorById } from "../authors/getAuthorById.service.js";
import { getUserById } from "../user/getUserById.service.js";
export const addBookService = async (title, authorId, userId) => {
    const existingUser = await getUserById(userId);
    const existingAuthor = await getAuthorById(authorId);
    if (!existingAuthor || !existingUser) {
        throw new Error("Error");
    }
    return await db
        .insert(booksTable)
        .values({ title, authorId, userId: userId, statusId: 1 });
};
