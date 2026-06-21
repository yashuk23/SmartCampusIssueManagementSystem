import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("=== DEBUG START ===");
    console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
    console.log("MONGO_URI:", process.env.MONGO_URI);

    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("=== MONGODB ERROR ===");
    console.error(error);
    throw error;
  }
};