import { z } from "zod";
import { deleteBookByTitleService } from "../../service/books/deleteBookByTitle.service.js";
const deleteBookSchema = z.object({
    title: z.string().min(1, "title must be at least one charcater long"),
});
export const updateBookTitle = async (req, res) => {
    const parsed = deleteBookSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ msg: "invalid request" });
        return;
    }
    try {
        const { title } = parsed.data;
        await deleteBookByTitleService(title);
        res.status(200).json({ msg: "book has been deleted" });
    }
    catch (err) {
        res.status(500).json({ err: err.message });
        return;
    }
};
