import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDb } from "./utils/db";
import { UserRoutes } from "./routes/user.routes";
import { ContentRoutes } from "./routes/content.routes";
import { ShareRoutes } from "./routes/share.routes";
import cors from "cors";


const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "server is up and running " });
});
//health checkup point for uptime
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "health ok" });
});
app.use("/api/v1", UserRoutes);
app.use("/api/v1", ContentRoutes);
app.use("/api/v1/brain", ShareRoutes);
connectDb();
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
