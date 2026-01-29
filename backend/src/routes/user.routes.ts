import express from "express";
import {
  createUserSchema,
  loginUserSchema,
} from "../validators/user.validator";
import { validateRequest } from "../validators/validateRequest";

export const UserRoutes = express.Router();

UserRoutes.post("/signup", validateRequest(createUserSchema));
UserRoutes.post("/login", validateRequest(loginUserSchema));
UserRoutes.post("/logout");
