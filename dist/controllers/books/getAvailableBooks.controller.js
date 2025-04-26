import { getAvailableBooksService } from "../../service/books/getAvailableBooks.service.js";
export const getAvailableBooks = async (req, res) => {
    try {
        const books = await getAvailableBooksService();
        res.status(200).json({ msg: "All available books:", books: books });
        return;
    }
    catch (err) {
        res.status(500).json({ err: err.message });
        return;
    }
};
