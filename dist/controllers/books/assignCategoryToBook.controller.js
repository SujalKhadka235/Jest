import { z } from "zod";
import { assignCategoryToBookService } from "../../service/books/assignCategoryToBook.service.js";
const assignCategorytoBookSchema = z.object({
    book_id: z.number(),
    category: z.string().min(1, "category must be at least one character long"),
});
export const assignCategoryToBook = async (req, res) => {
    const parsed = assignCategorytoBookSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ msg: "invalid request" });
        return;
    }
    try {
        const { book_id, category } = parsed.data;
        await assignCategoryToBookService(book_id, category);
        res.status(200).json({ msg: "Category has been assigned to the book" });
    }
    catch (err) {
        res.status(500).json({ err: err.message });
        return;
    }
};
