import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port: number = Number(process.env.PORT) || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello how are you");
});
app.listen(port, () => {
  console.log("Server is running at port " + port);
});
