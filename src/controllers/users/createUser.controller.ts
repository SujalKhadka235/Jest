import { Request, RequestHandler, Response } from "express";
import { z } from "zod";

import { createUserService } from "../../service/user/createUser.service.js";
const createUserSchema = z.object({
  name: z.string().min(1, "name should be at least one character long"),
  email: z.string().email("invalid email"),
  password: z.string().min(1, "password should be at least one character long"),
});
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.body;
  const parsed = createUserSchema.safeParse(data);
  if (!parsed.success) {
    res.status(400).json({ msg: "invalid request" });
    return;
  }
  try {
    const { name, email, password } = parsed.data;
    const createdUserId = await createUserService(name, email, password);
    res
      .status(201)
      .json({ msg: "User has been created", createdUserId: createdUserId });
    return;
  } catch (err) {
    res.status(500).json({ msg: "internal server error", err: err });
    return;
  }
};
