import { z } from "zod";
import { addBookCategory } from "../../service/books/addBookCategory.service.js";
const createBookCategorySchema = z.object({
    name: z.string().min(1, "category name must be at least one character long"),
});
export const createBookCategory = async (req, res) => {
    const parsed = createBookCategorySchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ msg: "invalid request" });
        return;
    }
    try {
        const { name } = parsed.data;
        await addBookCategory(name);
        res.status(201).json({ msg: "Book category has been created" });
    }
    catch (err) {
        res.status(500).json({ err: err.message });
        return;
    }
};
