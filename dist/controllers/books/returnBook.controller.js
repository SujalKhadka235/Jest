import { getUserById } from "../../service/user/getUserById.service.js";
import { returnBookService } from "../../service/books/returnBook.service.js";
export const returnBook = async (req, res) => {
    try {
        const book_id = Number(req.params.id);
        const userId = req.user._id;
        await getUserById(userId);
        await returnBookService(book_id, userId);
        res.status(200).json({ msg: "Book has been successfully returned" });
        return;
    }
    catch (err) {
        res.status(500).json({ err: err.message });
        return;
    }
};
