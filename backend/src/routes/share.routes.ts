import express from "express";
import { validateRequest } from "../validators/validateRequest";
import { shareContentSchema } from "../validators/content.validator";

export const ShareRoutes = express.Router();

ShareRoutes.post("/share");
ShareRoutes.get("/share/:id?", validateRequest(shareContentSchema));
