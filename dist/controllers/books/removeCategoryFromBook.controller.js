import { z } from "zod";
import { getBookById } from "../../service/books/getBookbyId.service.js";
import { removeCategoryFromBookService } from "../../service/books/removeCategoryfromBook.service.js";
const removeCategoryFromBookSchema = z.object({
    category: z.string().min(1, "Category must be at least one character long"),
});
export const removeCategoryFromBook = async (req, res) => {
    const parsed = removeCategoryFromBookSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ msg: "Invalid request" });
        return;
    }
    try {
        const bookIdFromParams = Number(req.params.id);
        if (isNaN(bookIdFromParams)) {
            res.status(400).json({ msg: "Invalid book ID" });
            return;
        }
        const author_id = req.author?._author_id;
        const book = await getBookById(bookIdFromParams);
        if (book.authorId !== author_id) {
            res.status(403).json({
                msg: "You are unauthorized to remove a category from this book",
            });
            return;
        }
        const { category } = parsed.data;
        await removeCategoryFromBookService(bookIdFromParams, category);
        res.status(200).json({ msg: "Category has been removed from the book" });
    }
    catch (err) {
        res.status(500).json({ err: err.message });
        return;
    }
};
