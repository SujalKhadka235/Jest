import { getAllBooksService } from "../../service/books/getAllBooks.service.js";
export const getAllBooks = async (req, res) => {
    try {
        const books = await getAllBooksService();
        res.status(200).json({ msg: "All books:", books: books });
        return;
    }
    catch (err) {
        res.status(500).json({ err: err.message });
        return;
    }
};
