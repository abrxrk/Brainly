import { Request, Response } from "express";
import { Content, contentTypes } from "../models/content.schema";
import { ApiResponse } from "../utils/apiResponse";

export const createContent = async (req: Request, res: Response) => {
  const { link, title, tags, type } = req.body;
  //@ts-ignore
  const userId = req.userId;
  try {
    const content = await Content.create({
      link,
      title,
      tags,
      userId,
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
    const findContent = await Content.findOne({ _id: id, userId: userId });
    if (!findContent) {
      return res
        .status(404)
        .json({ message: "content not found or unauthorized" });
    }
    const updateFields: any = {};
    if (link !== undefined) updateFields.link = link;
    if (title !== undefined) updateFields.title = title;
    if (tags !== undefined) updateFields.tags = tags;
    if (type !== undefined) updateFields.type = type;
    const updateContent = await Content.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    res
      .status(200)
      .json(new ApiResponse("content updated successfully", updateContent));
    console.log("content- ", updateContent);
  } catch (error: unknown) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
}; 

export const deleteContent = async (req: Request, res: Response) => {
  const { id } = req.params
  //@ts-ignore
  const userId = req.userId
  try {
    const findContent = await Content.findOneAndDelete({ _id: id, userId: userId })
    if (!findContent) {
      return res.status(404).json({ message: "nothing to delete, or unauthorized"})
    }
    res.status(200).json(new ApiResponse("content deleted successfully"))
  } catch (error: unknown) {
    res.status(500).json({
      message: "internal server error",
      error: error
    })
	console.error(error);
  }
}
