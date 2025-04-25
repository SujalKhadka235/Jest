import { Response } from "express";
import { parse } from "path";

import { z } from "zod";
import { deleteBookByTitleService } from "../../service/books/deleteBookByTitle.service.js";

const deleteBookSchema = z.object({
  title: z.string().min(1, "title must be at least one charcater long"),
});
export const updateBookTitle = async (
  req: any,
  res: Response
): Promise<void> => {
  const parsed = deleteBookSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ msg: "invalid request" });
    return;
  }
  try {
    const { title } = parsed.data;
    await deleteBookByTitleService(title);
    res.status(200).json({ msg: "book has been deleted" });
  } catch (err: any) {
    res.status(500).json({ err: err.message });
    return;
  }
};
