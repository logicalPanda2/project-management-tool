import type { Request, Response } from "express";
import * as userRepo from "../users/userRepo.js";
import * as commentRepo from "../comments/commentRepo.js";

export default async function guardCommentDeletion(
    req: Request,
	res: Response,
	next: (...args: any[]) => any,
) {
    if(
        !("projectId" in req.params) ||
        typeof req.params.projectId !== "string" ||
        !("commentId" in req.params) ||
        typeof req.params.commentId !== "string"
    ) return res.sendStatus(400);

    const user = req.user;
    if(!user) return res.sendStatus(401);
    
    const DBUser = await userRepo.getUserByEmail(user.email);
    if(!DBUser) return res.sendStatus(401);

    const projectId = req.params.projectId;
    const roleInfo = await userRepo.getRole(DBUser.id, projectId);
    if(!roleInfo) return res.sendStatus(403);

    const comment = await commentRepo.getAssociatedUserId(req.params.commentId);

    if(roleInfo.user_role === "CREATOR") next();
    else if(roleInfo.user_role === "CONTRIBUTOR" && comment.user_id === roleInfo.id) next();
    else return res.sendStatus(403);

    return undefined;
}
