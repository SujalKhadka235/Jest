import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = Number(process.env.PORT) || 3000;
app.get("/", (req, res) => {
    res.send("Hello how are you");
});
app.listen(port, () => {
    console.log("Server is running at port " + port);
});
