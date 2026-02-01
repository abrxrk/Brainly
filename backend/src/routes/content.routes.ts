import express from "express";
import { validateRequest } from "../validators/validateRequest";
import {
  createContentSchema,
  deleteContentSchema,
  updateContentSchema,
} from "../validators/content.validator";
import { auth } from "../middleware/auth.middleware";
import {
  createContent,
  deleteContent,
  getContent,
  updateContent,
} from "../controllers/content.controller";
import { upload } from "../middleware/multer.middleware";

export const ContentRoutes = express.Router();

ContentRoutes.get("/content", auth, getContent);
ContentRoutes.post(
  "/addContent",
  auth,
  upload.single("media"),
  validateRequest(createContentSchema),
  createContent,
);
ContentRoutes.put(
  "/content/:id",
  auth,
  upload.single("media"),
  validateRequest(updateContentSchema),
  updateContent,
);
ContentRoutes.delete(
  "/content/:id",
  auth,
  validateRequest(deleteContentSchema),
  deleteContent,
);
