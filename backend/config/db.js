import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return mongoose.connection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set in backend/.env");
  }

  const connection = await mongoose.connect(process.env.MONGO_URI);
  isConnected = connection.connection.readyState === 1;
  console.log(`MongoDB connected: ${connection.connection.host}`);
  return connection.connection;
};

export const getDbStatus = () => ({
  connected: mongoose.connection.readyState === 1,
  readyState: mongoose.connection.readyState
});
