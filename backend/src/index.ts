import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./utils/db";

dotenv.config();
const app = express();
app.use(express.json());

connectDb();
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
