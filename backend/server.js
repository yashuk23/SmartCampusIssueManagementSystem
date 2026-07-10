import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectDB, getDbStatus } from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const defaultAllowedOrigins = [
  "https://smart-campus-issue-management-syste-murex.vercel.app",
  "https://smart-campus-issue-management-system-gh9yqtsek.vercel.app"
];

const configuredAllowedOrigins = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = new Set([...defaultAllowedOrigins, ...configuredAllowedOrigins]);

const isAllowedVercelPreview = (origin) => {
  if (!origin) {
    return false;
  }

  try {
    const { hostname } = new URL(origin);
    return hostname.endsWith(".vercel.app") && hostname.startsWith("smart-campus-issue-management");
  } catch {
    return false;
  }
};

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin) || isAllowedVercelPreview(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204
};

const ensureDb = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(503).json({
      message: error.message || "Database connection failed"
    });
  }
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.json({
    message: "Smart Campus Issue Management API",
    health: "/api/health",
    auth: "/api/auth",
    issues: "/api/issues"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    message: "Smart Campus Issue Management API is running",
    database: getDbStatus()
  });
});

app.use("/api/auth", ensureDb, authRoutes);
app.use("/api/issues", ensureDb, issueRoutes);

app.use(notFound);
app.use(errorHandler);

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
