import type { Request, Response } from "express";

export function getCredentials(req: Request, res: Response, next: (...args: any[]) => any) {
    res.json({
        message: "Credentials got"
    });
}

export function getNewAccessToken(req: Request, res: Response, next: (...args: any[]) => any) {
    res.json({
        message: "New access token granted"
    });
}

export function deleteCredentials(req: Request, res: Response, next: (...args: any[]) => any) {
    res.json({
        message: "Credentials removed"
    });
}
