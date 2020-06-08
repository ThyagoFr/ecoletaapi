import express from "express";
import path from "path";
import cors from "cors";
import router from "./routes/router";

const app = express();

app.use(cors())
app.use(express.json());

app.use(router);
app.use("/uploads", express.static(path.resolve(__dirname, ".." , "uploads" )));

app.listen(8000, () => {
  console.log("Server running on port 8000")
});