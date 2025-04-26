import { z } from "zod";
import { getBookById } from "../../service/books/getBookbyId.service.js";
import { updateBookTitleService } from "../../service/books/updateBookTitle.service.js";
const updateBookTitleSchema = z.object({
    title: z.string().min(1, "title must be at least one character long"),
});
export const updateBookTitle = async (req, res) => {
    const parsed = updateBookTitleSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ msg: "invalid request" });
        return;
    }
    const bookIdFromParams = Number(req.params.id);
    if (isNaN(bookIdFromParams)) {
        res.status(400).json({ msg: "Invalid book ID" });
        return;
    }
    try {
        const { title } = parsed.data;
        const authorIdFromToken = req.author?._author_id;
        const book = await getBookById(bookIdFromParams);
        if (!book) {
            res.status(404).json({ msg: "Book not found" });
            return;
        }
        if (book.authorId !== authorIdFromToken) {
            res
                .status(403)
                .json({ msg: "You are not authorized to update this book" });
            return;
        }
        await updateBookTitleService(title, bookIdFromParams);
        res.status(200).json({ msg: "Book title has been updated successfully" });
        return;
    }
    catch (err) {
        res.status(500).json({ err: err.message });
        return;
    }
};
