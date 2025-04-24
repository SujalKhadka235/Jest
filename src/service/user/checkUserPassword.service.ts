import { getUserById } from "./getUserById.service.js";
import bcrypt from "bcryptjs";
export const checkUserPassword = async (id: number, password: string) => {
  if (!id || !password) {
    throw new Error("invalid input");
  }
  const user = await getUserById(id);
  const isPasswordAccurate = await bcrypt.compare(password, user.password);
  if (!isPasswordAccurate) {
    throw new Error("password does not match");
  }
  return true;
};
