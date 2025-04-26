import { Response } from "express";

import { z } from "zod";

import { addBookService } from "../../service/books/addBook.service.js";
import { assignCategoryToBookService } from "../../service/books/assignCategoryToBook.service.js";
const createBookSchema = z.object({
  title: z.string().min(1, "title must be at least one charcater long"),
  category: z.string().optional(),
});
export const createBook = async (req: any, res: Response): Promise<void> => {
  const parsed = createBookSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ msg: "invalid request" });
    return;
  }
  try {
    const { title, category } = parsed.data;

    const authorId = req.author?._author_id;

    const createdbookId = await addBookService(title, authorId);
    if (category) {
      await assignCategoryToBookService(createdbookId, category);
    }
    res.status(201).json({ msg: "book has been created" });
    return;
  } catch (err: any) {
    res.status(500).json({ err: err.message });
    return;
  }
};
