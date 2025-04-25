import { eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { authorsTable } from "../../db/schema.js";
export const getIdByAuthor = async (author_name) => {
    const author = await db
        .select()
        .from(authorsTable)
        .where(eq(authorsTable.name, author_name))
        .limit(1);
    if (author.length === 0) {
        throw new Error("Author with that name does not exist");
    }
    return author[0].id;
};
