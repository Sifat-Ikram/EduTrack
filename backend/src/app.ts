import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import studentRoutes from "./routes/student.routes";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();

app.use(
  cors({
    origin:
      process.env.CLIENT_URL || "https://edutrack-frontend-tau.vercel.app",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "EduAyna API is running" });
});

// Routes
app.use("/api/students", studentRoutes);

// 404 and error handling — must be registered last
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
