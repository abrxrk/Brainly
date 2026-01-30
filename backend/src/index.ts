import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDb } from "./utils/db";
import { UserRoutes } from "./routes/user.routes";
import { ContentRoutes } from "./routes/content.routes";
import { ShareRoutes } from "./routes/share.routes";

dotenv.config();
const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({message:"server is up and running "})
})
app.use("/api/v1", UserRoutes);
app.use("/api/v1", ContentRoutes);
app.use("/api/v1/brain", ShareRoutes);
connectDb();
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
