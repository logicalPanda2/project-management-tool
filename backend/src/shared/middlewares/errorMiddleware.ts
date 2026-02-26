import type { Request, Response } from "express";

export default function errorMiddleware(
    err: HttpError,
    _req: Request, 
    res: Response, 
    _next: (...args: any[]) => any
) {
    const statusCode = err.status ?? 500;
    const statusMessage = err.message ?? "Internal Server Error";

    res.status(statusCode).json({
        message: statusMessage,
    });
}
