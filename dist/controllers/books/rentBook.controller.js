import { rentBookService } from "../../service/books/rentBook.service.js";
import { getUserById } from "../../service/user/getUserById.service.js";
export const rentBook = async (req, res) => {
    try {
        const book_id = Number(req.params.id);
        const userId = req.user._id;
        await getUserById(userId);
        await rentBookService(book_id, userId);
        res.status(200).json({ msg: "Book has been successfully rented" });
        return;
    }
    catch (err) {
        res.status(500).json({ err: err.message });
        return;
    }
};
