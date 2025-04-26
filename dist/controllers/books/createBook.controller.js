import { z } from "zod";
import { getIdByAuthor } from "../../service/authors/getIdByAuthor.service.js";
import { addBookService } from "../../service/books/addBook.service.js";
const createBookSchema = z.object({
    title: z.string().min(1, "title must be at least one charcater long"),
    author: z.string().min(1, "author name must be at least 1 charcaters long"),
});
export const createBook = async (req, res) => {
    const parsed = createBookSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ msg: "invalid request" });
        return;
    }
    try {
        const { title, author } = parsed.data;
        const userId = req.user?._id;
        console.log(userId);
        if (!userId) {
            res.status(401).json({ msg: "Unauthorized" });
            return;
        }
        const authorId = await getIdByAuthor(author);
        await addBookService(title, authorId, userId);
        res.status(201).json({ msg: "book has been created" });
        return;
    }
    catch (err) {
        res.status(500).json({ err: err.message });
        return;
    }
};
