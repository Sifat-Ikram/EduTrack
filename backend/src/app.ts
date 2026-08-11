import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import studentRoutes from "./routes/student.routes";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();

// Middlewares
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
    })
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