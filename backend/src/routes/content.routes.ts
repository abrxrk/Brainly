import express from "express";
import { validateRequest } from "../validators/validateRequest";
import {
  createContentSchema,
  updateContentSchema,
} from "../validators/content.validator";

export const ContentRoutes = express.Router();

// ContentRoutes.get("/content");
// ContentRoutes.post("/addContent", validateRequest(createContentSchema));
// ContentRoutes.put("/updateContent", validateRequest(updateContentSchema));
// ContentRoutes.delete("/deleteContent");
