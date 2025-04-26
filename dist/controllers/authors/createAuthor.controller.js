import { z } from "zod";
import { createAuthorService } from "../../service/authors/createAuthor.service.js";
const createAuthorSchema = z.object({
    name: z.string().min(1, "name should be at least one character long"),
    email: z.string().email("invalid email"),
    password: z.string().min(1, "password should be at least one character long"),
});
export const createAuthor = async (req, res) => {
    const data = req.body;
    const parsed = createAuthorSchema.safeParse(data);
    if (!parsed.success) {
        res.status(400).json({ msg: "invalid request" });
        return;
    }
    try {
        const { name, email, password } = parsed.data;
        const createdAuthorId = await createAuthorService(name, email, password);
        res
            .status(201)
            .json({
            msg: "Author has been created",
            createdAuthorId: createdAuthorId,
        });
        return;
    }
    catch (err) {
        res.status(500).json({ msg: "internal server error", err: err.message });
        return;
    }
};
