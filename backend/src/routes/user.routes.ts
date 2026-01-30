import express from "express";
import {
  createUserSchema,
  loginUserSchema,
} from "../validators/user.validator";
import { validateRequest } from "../validators/validateRequest";
import { login, logout, signup } from "../controllers/user.controller";

export const UserRoutes = express.Router();

UserRoutes.post("/signup", validateRequest(createUserSchema) , signup);
UserRoutes.post("/login", validateRequest(loginUserSchema), login);
UserRoutes.post("/logout" , logout);
