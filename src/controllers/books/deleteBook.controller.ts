import { Response } from "express";

import { deleteBookbyIdService } from "../../service/books/deleteBookbyId.service.js";
import { getBookById } from "../../service/books/getBookbyId.service.js";

export const deleteBook = async (req: any, res: Response): Promise<void> => {
  try {
    const bookIdFromParams = Number(req.params.id);
    if (isNaN(bookIdFromParams)) {
      res.status(400).json({ msg: "Invalid book ID" });
      return;
    }
    const author_id = req.author?._author_id;
    const book = await getBookById(bookIdFromParams);
    if (book.authorId !== author_id) {
      res.status(403).json({ msg: "You are unauthorized to delete this book" });
      return;
    }
    await deleteBookbyIdService(bookIdFromParams);
    res.status(200).json({ msg: "book has been deleted" });
  } catch (err: any) {
    res.status(500).json({ err: err.message });
    return;
  }
};
