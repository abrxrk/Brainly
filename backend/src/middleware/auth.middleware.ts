import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    //@ts-ignore
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "token missing" });
    }
    const user = jwt.verify(token, process.env.SECRET_KEY!);
    //@ts-ignore
    req.userId = user.id;
    next();
  } catch (error: unknown) {
    console.error(error);
    return res.status(401).json({ message: "invalid or expired token" });
  }
};
