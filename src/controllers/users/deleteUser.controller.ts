import { Request, Response } from "express";
import { z } from "zod";
import { checkUserPassword } from "../../service/user/checkUserPassword.service.js";
import { deleteUserService } from "../../service/user/deleteUser.service.js";
const deleteUserSchema = z.object({
  password: z.string().min(5, "password must be at least 5 characters long"),
});
export const deleteUser = async (req: any, res: Response): Promise<void> => {
  const parsed = deleteUserSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ msg: "invalid request body" });
    return;
  }
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({ msg: "Unauthorized" });
      return;
    }
    const { password } = parsed.data;
    await checkUserPassword(userId, password);

    await deleteUserService(userId);
    res.status(200).json({ msg: "User sucessfully deleted" });
    return;
  } catch (err: any) {
    res.status(500).json({ err: err.message });
    return;
  }
};
