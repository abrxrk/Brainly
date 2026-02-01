import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const fileUploaderOnClound = async (filePath: string) => {
  try {
    if (!filePath) return null;
    const uploadedFile = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(filePath);
    console.log("File deleted:", filePath);
    return uploadedFile;
  } catch (error: unknown) {
    fs.unlinkSync(filePath);
    console.error(error);
    return null;
  }
};
