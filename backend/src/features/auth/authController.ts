import type { Request, Response } from "express";

export function login(req: Request, res: Response, next: (...args: any[]) => any) {
    res.json({
        message: "Credentials got"
    });
}

export function refresh(req: Request, res: Response, next: (...args: any[]) => any) {
    res.json({
        message: "New access token granted"
    });
}

export function logout(req: Request, res: Response, next: (...args: any[]) => any) {
    res.json({
        message: "Credentials removed"
    });
}
