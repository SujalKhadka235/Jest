import { z } from "zod";
import { getBookById } from "../../service/books/getBookbyId.service.js";
import { updateBookTitleService } from "../../service/books/updateBookTitle.service.js";
const updateBookTitleSchema = z.object({
    book_id: z.number().min(1),
    title: z.string().min(1, "title must be at least one charcater long"),
});
export const updateBookTitle = async (req, res) => {
    const parsed = updateBookTitleSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ msg: "invalid request" });
        return;
    }
    try {
        const { book_id, title } = parsed.data;
        await getBookById(book_id);
        await updateBookTitleService(title, book_id);
        res.status(201).json({ msg: "Book title has been updated sucessfully" });
        return;
    }
    catch (err) {
        res.status(500).json({ err: err.message });
        return;
    }
};
