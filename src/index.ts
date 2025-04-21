import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/users/user.routes.js";
dotenv.config();
const app = express();
const port: number = Number(process.env.PORT) || 3000;
app.use(express.json());
app.use("/users", userRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello how are you");
});
app.listen(port, () => {
  console.log("Server is running at port " + port);
});
