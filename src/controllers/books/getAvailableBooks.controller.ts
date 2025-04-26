import { Request, Response } from "express";
import { getAvailableBooksService } from "../../service/books/getAvailableBooks.service.js";
export const getAvailableBooks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const books = await getAvailableBooksService();
    res.status(200).json({ msg: "All available books:", books: books });
    return;
  } catch (err: any) {
    res.status(500).json({ err: err.message });
    return;
  }
};
