import { Request, Response } from "express";
import { User } from "../models/user.schema";
import bcrypt from "bcrypt";
import { ApiResponse } from "../utils/apiResponse";
import jwt from "jsonwebtoken"


export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "user already exists, please login..." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    res.status(200).json(new ApiResponse("User created successfully..."));
    console.log("new user created ", createUser);
  } catch (error: unknown) {
    res.status(500).json({
      message: "error signing up user",
    });
    console.error(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found, please signup..." });
    }
    const comparePassword = await bcrypt.compare( password , user.password,)
    const compareUsername = username === user.username
    if (!comparePassword || !compareUsername) {
      return res.status(404).json({message:"incorrect credentials"})
    }
    const token = jwt.sign({id: user._id} , process.env.SECRET_KEY! )
    
    res.status(200).json(new ApiResponse("User logged in successfully..." , token));
    console.log("logged in succesfully", );
  } catch (error: unknown) {
    res.status(500).json({
      message: "error loggin in",
    });
    console.error(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  return res.status(201).json(new ApiResponse("user logged out successfully"))
}