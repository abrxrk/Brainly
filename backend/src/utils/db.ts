import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("successfully connected to MongoDB")
  } catch (error: unknown) {
    console.error(error);
  }
};
