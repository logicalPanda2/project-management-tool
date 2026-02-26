import type { Request, Response } from "express";

export default function logMiddleware(req: Request, res: Response, next: (...args: any[]) => any) {
    const startTimeInMs = Date.now();

    res.on("finish", () => {
        const durationMs = Date.now() - startTimeInMs;
        console.log(
            `${req.method} ${req.originalUrl}\nDone in ${durationMs}ms\nFinished with status ${res.statusCode}\nwith the following message ${res.statusMessage}\n`
        );
    });

    next();
}
