import mongoose from "mongoose";
const { Schema } = mongoose;

const ShareSchema = new Schema(
  {
    shareLink: { type: String, unique: true, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export const Share = mongoose.model("Share", ShareSchema);
