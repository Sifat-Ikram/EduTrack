import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

// Centralized error handler — every controller calls next(error) and it lands here
export const errorHandler = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err instanceof ApiError ? err.statusCode : 500;
    const message = err.message || "Internal Server Error";

    // Log full error server-side for debugging, but don't leak internals to the client
    console.error(`[Error] ${req.method} ${req.originalUrl} -`, err);

    res.status(statusCode).json({
        success: false,
        message,
    });
};

// Catches requests to routes that don't exist
export const notFoundHandler = (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
};