import express from "express";
import { validateRequest } from "../validators/validateRequest";
import { shareContentSchema } from "../validators/content.validator";
import { auth } from "../middleware/auth.middleware";
import { createShortLink, getShortLink } from "../controllers/share.controller";

export const ShareRoutes = express.Router();

ShareRoutes.post("/share", auth, createShortLink);
ShareRoutes.get(
  "/share/:id",
  // validateRequest(shareContentSchema),
  getShortLink,
);
