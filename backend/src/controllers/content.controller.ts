import { Request, Response } from "express";
import { Content, contentTypes } from "../models/content.schema";
import { ApiResponse } from "../utils/apiResponse";
import { fileUploaderOnClound } from "../utils/cloudinary";
import { v2 as cloudinary } from "cloudinary";

export const createContent = async (req: Request, res: Response) => {
  const { link, title, tags, type } = req.body;
  //@ts-ignore
  const userId = req.userId;
  try {
    let media: string | null = null;
    let mediaId: string | null = null;
    if (req.file) {
      const filePath = req.file.path;
      const upload = await fileUploaderOnClound(filePath);
      //@ts-ignore
      media = upload.url;
      //@ts-ignore
      mediaId = upload.public_id;
    }
    const content = await Content.create({
      link,
      title,
      tags,
      userId,
      media,
      mediaId,
      type,
    });
    res
      .status(200)
      .json(new ApiResponse("content created successfully", content));
    console.log("content- ", content);
  } catch (error: unknown) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
};
export const getContent = async (req: Request, res: Response) => {
  //@ts-ignore
  const user = req.userId;
  try {
    const findContent = await Content.find({
      userId: user,
    }).populate("userId", "username email");
    console.log("content- ", findContent);
    res
      .status(200)
      .json(new ApiResponse("content fetched successfully", findContent));
  } catch (error: unknown) {
    res.status(500).json({ message: "internal servor error ", error: error });
    console.error(error);
  }
};
export const updateContent = async (req: Request, res: Response) => {
  const { link, title, tags, type } = req.body;
  const { id } = req.params;
  //@ts-ignore
  const userId = req.userId;
  try {
    const findContent = await Content.findOne({ _id: id, userId });
    if (!findContent) {
      return res
        .status(404)
        .json({ message: "content not found or unauthorized" });
    }
    let media: string | null = findContent.media ?? null;
    let mediaId: string | null = findContent.mediaId ?? null;
    if (req.file) {
      if (findContent.mediaId) {
        await cloudinary.uploader.destroy(findContent.mediaId);
      }
      const filePath = req.file.path;
      const upload = await fileUploaderOnClound(filePath);
      //@ts-ignore
      media = upload.url;
      //@ts-ignore
      mediaId = upload.public_id;
    }
    const updateFields: Partial<typeof findContent> = {};
    if (link !== undefined) updateFields.link = link;
    if (title !== undefined) updateFields.title = title;
    if (tags !== undefined) updateFields.tags = tags;
    if (type !== undefined) updateFields.type = type;
    updateFields.media = media;
    updateFields.mediaId = mediaId;
    const updatedContent = await Content.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    res
      .status(200)
      .json(new ApiResponse("content updated successfully", updatedContent));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
};
export const deleteContent = async (req: Request, res: Response) => {
  const { id } = req.params;
  //@ts-ignore
  const userId = req.userId;
  try {
    const findContent = await Content.findOneAndDelete({
      _id: id,
      userId: userId,
    });
    if (!findContent) {
      return res
        .status(404)
        .json({ message: "nothing to delete, or unauthorized" });
    }
    if (findContent.mediaId) {
      await cloudinary.uploader.destroy(findContent.mediaId);
    }
    res.status(200).json(new ApiResponse("content deleted successfully"));
  } catch (error: unknown) {
    res.status(500).json({
      message: "internal server error",
      error: error,
    });
    console.error(error);
  }
};
