import { z } from "zod";
import { updateUserNameService } from "../../service/user/updateUserName.service.js";
const updateUserSchema = z.object({
    name: z.string().min(1, "updated name should be at least one character long"),
});
export const updateUserName = async (req, res) => {
    const data = req.body;
    const parsed = updateUserSchema.safeParse(data);
    if (!parsed.success) {
        res.status(400).json({ msg: "invalid request" });
    }
    try {
        if (!parsed.data?.name) {
            return;
        }
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ msg: "Unauthorized" });
            return;
        }
        await updateUserNameService(userId, parsed.data?.name);
        res.status(200).json({ msg: "Username updated successfully" });
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
};
