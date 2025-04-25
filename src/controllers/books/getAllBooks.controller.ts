import { Request, Response } from "express";
import { getAllBooksService } from "../../service/books/getAllBooks.service.js";
export const getAllBooks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const books = await getAllBooksService();
    res
      .status(200)
      .json({ msg: "All books availabe are as follows", books: books });
    return;
  } catch (err: any) {
    res.status(500).json({ err: err.message });
    return;
  }
};
