import { connectDB } from "../config/db.js";

export const ensureDb = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(503).json({
      message: error.message || "Database connection failed"
    });
  }
};
