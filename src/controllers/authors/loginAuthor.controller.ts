import { Request, Response } from "express";
import { z } from "zod";
import { loginAuthorService } from "../../service/authors/loginAuthor.service.js";
const loginAuthorSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string().min(5, "password must be at least 5 characters long"),
});
export const loginAuthor = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.body;
  const parsed = loginAuthorSchema.safeParse(data);
  if (!parsed.success) {
    res.status(400).json({ msg: "invalid request" });
    return;
  }
  try {
    const { email, password } = parsed.data;
    const token = await loginAuthorService(email, password);
    if (!token) {
      throw new Error("Login failed");
    }
    res.status(200).json({ message: "sucessfully logged in", token: token });
    return;
  } catch (err: any) {
    res.status(500).json({ err: err.message });
    return;
  }
};
