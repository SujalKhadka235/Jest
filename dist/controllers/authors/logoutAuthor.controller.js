import { logoutAuthorService } from "../../service/authors/logoutAuthor.service.js";
export const logoutAuthor = async (req, res) => {
    try {
        const header = req.headers.authorization || req.headers.Authorization;
        if (typeof header !== "string") {
            res.status(400).json({ msg: "invalid header type" });
            return;
        }
        if (!header.startsWith("Bearer ")) {
            res.status(400).json({ msg: "invalid header " });
            return;
        }
        const token = header.split(" ")[1];
        await logoutAuthorService(token);
        res.status(200).json({ msg: "logged out successfully" });
        return;
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        return;
    }
};
