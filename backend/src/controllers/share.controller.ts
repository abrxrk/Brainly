import { Request, Response } from "express";
import { Share } from "../models/share.schema";
import { ApiResponse } from "../utils/apiResponse";
import { Content } from "../models/content.schema";

export const createShortLink = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.userId;
  try {
    const existingLink = await Share.findOne(userId);
    if (!existingLink) {
      const shortLink = Math.random().toString(36).substring(2, 10);
      const saveLink = await Share.create({
        shareLink: shortLink,
        userId,
      });
      res
        .status(201)
        .json(new ApiResponse("short link created successfully", shortLink));
    } else {
      res
        .status(200)
        .json(
          new ApiResponse("share link already exists", existingLink.shareLink),
        );
    }
  } catch (error: unknown) {
    res.status(500).json({ message: "internal server error", error: error });
    console.error(error);
  }
};

export const getShortLink = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const findShortLink = await Share.findOne({ shareLink: id });
    if (findShortLink) {
      const content = await Content.find({
        userId: findShortLink.userId,
      }).populate("userId", "username");
      res
        .status(200)
        .json(new ApiResponse("content fetched successfully", content));
    } else {
      res.status(404).json({ message: "invalid short url" });
    }
  } catch (error: unknown) {
    res.status(500).json({ message: "internal server errror", error: error });
    console.error(error);
  }
};
