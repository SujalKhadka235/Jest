import { z } from "zod";
import { getBooksByCategoryService } from "../../service/books/getBooksByCategory.service.js";
const getBooksByCategorySchema = z.object({
    category: z.string().min(1, "category should be at least one character long"),
});
export const getBooksByCategory = async (req, res) => {
    const parsed = getBooksByCategorySchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ msg: "invalid request" });
        return;
    }
    try {
        const { category } = parsed.data;
        const books = await getBooksByCategoryService(category);
        res.status(200).json({ msg: "All books in this category:", books: books });
        return;
    }
    catch (err) {
        res.status(500).json({ err: err.message });
        return;
    }
};
