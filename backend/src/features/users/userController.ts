import type { Request, Response } from "express";
import * as userRepo from "./userRepo.js";

export async function verifyRole(
    req: Request,
	res: Response,
	next: (...args: any[]) => any,
) {
    try {
        if (!("projectId" in req.params) || typeof req.params.projectId !== "string")
			return res.sendStatus(400);

        const projectId = req.params.projectId;
        const user = req.user;
        if(!user) return res.sendStatus(401);

        const creator = await userRepo.getCreatorEmailByProjectId(projectId);

        if(creator.email === user.email) {
            return res.json({ isCreator: true });
        }

        return res.json({ isCreator: false, email: user.email });
    } catch(e) {
        next(e);
    }

    return undefined;
}
