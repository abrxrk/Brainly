import mongoose from "mongoose";
const { Schema } = mongoose;

export const contentTypes = ["image", "video", "article", "audio"];

const ContentSchema = new Schema(
  {
    link: { type: String, required: true },
    title: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    tags: { type: [String], required: true },
    type: { type: String, enum: contentTypes, required: true },
  },
  { timestamps: true },
);

export const Content = mongoose.model("Content", ContentSchema);
