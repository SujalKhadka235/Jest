import { getAllUsersService } from "../../service/user/getAllUsers.service.js";
export const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersService();
        if (users.length === 0) {
            res.status(200).json({ msg: "No users in the database at the moment" });
            return;
        }
        res.status(200).json({ users: users });
    }
    catch (err) {
        res.status(500).json({ msg: "Error", err: err.message });
    }
};
