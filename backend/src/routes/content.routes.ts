import express from "express";
import { validateRequest } from "../validators/validateRequest";
import {
  createContentSchema,
  deleteContentSchema,
  updateContentSchema,
} from "../validators/content.validator";
import { auth } from "../middleware/auth.middleware";
import { createContent, deleteContent, getContent, updateContent } from "../controllers/content.controller";

export const ContentRoutes = express.Router();

ContentRoutes.get("/content" , auth , getContent);
ContentRoutes.post("/addContent", validateRequest(createContentSchema) , auth , createContent);
ContentRoutes.put("/content/:id", validateRequest(updateContentSchema) , auth , updateContent);
ContentRoutes.delete("/content/:id" , validateRequest(deleteContentSchema) , auth , deleteContent);
