import type { Request, Response } from "express";
import * as userRepo from "./../../features/users/userRepo.js";

export default function requireRole(role: UserRole) {
    return async function (
        req: Request,
        res: Response,
        next: (...params: any[]) => any,
    ) {
        if(
            !("projectId" in req.params) ||
            typeof req.params.projectId !== "string"
        ) return res.sendStatus(400);
        
        const user = req.user;
        if(!user) return res.sendStatus(401);
        
        const DBUser = await userRepo.getUserByEmail(user.email);
        if(!DBUser) return res.sendStatus(401);

        const projectId = req.params.projectId;
        const roleInfo = await userRepo.getRole(DBUser.id, projectId);

        if(user.email === roleInfo.email && roleInfo.user_role !== role) return res.sendStatus(403);
        else next();

        return undefined;
    }
}
