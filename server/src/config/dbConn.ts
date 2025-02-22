import mongoose from "mongoose";
import env from "../config/config";

const connectDB = async (): Promise<void> => {
  const mongoUrl = env.MONGO_URL;

  if (!mongoUrl) {
    throw new Error("MONGO_URL is not defined in the environment variables.");
  }
  try {
    const conn = await mongoose.connect(mongoUrl);
    console.log(`Connected To Mongodb Database ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in Mongodb ${error}`);
  }
};

export { connectDB };
