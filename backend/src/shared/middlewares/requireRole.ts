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
        if(!roleInfo) return res.sendStatus(403);

        const requiredRole = role;
        const actualRole = roleInfo.user_role;

        // creator has higher privileges than contributor
        // only check whether a contributor is claiming to be a creator
        // if the user is honest, or a creator, proceed
        if(requiredRole === "CREATOR" && actualRole === "CONTRIBUTOR") return res.sendStatus(403);
        else next();

        return undefined;
    }
}
