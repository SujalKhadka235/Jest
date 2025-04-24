import { db } from "../../db/client.js";
import { booksTable } from "../../db/schema.js";
import { getAuthorById } from "../authors/getAuthorById.service.js";
import { getUserById } from "../user/getUserById.service.js";
export const addBookService = async (title, issuedDate, authorId, userId) => {
    const existingUser = await getUserById(userId);
    const existingAuthor = await getAuthorById(authorId);
    if (!existingAuthor || !existingUser) {
        throw new Error("Error");
    }
    return await db
        .insert(booksTable)
        .values({ title, issuedDate, authorId, userId, statusId: 1 });
};
