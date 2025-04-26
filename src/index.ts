import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/users/user.routes.js";
import bookRoutes from "./routes/books/books.routes.js";
import reviewsRoutes from "./routes/reviews/reviews.routes.js";
import authorRoutes from "./routes/authors/authors.routes.js";
import { swaggerUiHandler, swaggerUiMiddleware } from "./swagger.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUiMiddleware, swaggerUiHandler);
const port: number = Number(process.env.PORT) || 3000;

app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/reviews", reviewsRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello how are you");
});
app.listen(port, () => {
  console.log("Server is running at port " + port);
});
