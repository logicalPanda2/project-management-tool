import type { Request, Response } from "express"
import * as projectRepo from "./projectRepo.js";
import * as userRepo from "./../users/userRepo.js";
import * as Services from "./projectService.js";
import isProject from "../../shared/utils/typeGuards.js";

export async function getAll(req: Request, res: Response, next: (...args: any[]) => any) {
    try {
        const user = req.user;
        if(!user) return res.sendStatus(401);

        const projects: ProjectMetadata[] = await projectRepo.getAllByUserId(user.id);

        res.json({ projects: projects });
    } catch(e) {
        next(e);
    }

    return undefined;
}

export async function getById(req: Request, res: Response, next: (...args: any[]) => any) {
    try {
        if(
            !("projectId" in req.params) ||
            typeof req.params.projectId !== "string"
        ) return res.sendStatus(400);

        const id = req.params.projectId;

        const project = await Services.getFullProjectData(id);

        return res.json({
            project: project
        });
    } catch(e) {
        next(e);
    }

    return undefined;
}

export async function createOrUpdate(req: Request, res: Response, next: (...args: any[]) => any) {
    try {
        const project = req.body;

        if(
            typeof project !== "object" ||
            project === null ||
            !(isProject(project))
        ) return res.sendStatus(400);

        Services.upsert(project);

        res.sendStatus(204);
    } catch(e) {
        next(e);
    }

    return undefined;
}

export async function deleteById(req: Request, res: Response, next: (...args: any[]) => any) {
    try {
        if(
            !("projectId" in req.params) ||
            typeof req.params.projectId !== "string"
        ) return res.sendStatus(400);

        const id = req.params.projectId;

        await projectRepo.deleteById(id);

        return res.sendStatus(204);
    } catch(e) {
        next(e);
    }

    return undefined;
}

export async function invite(req: Request, res: Response, next: (...args: any[]) => any) {
    try {
        if(
            !("projectId" in req.params) ||
            typeof req.params.projectId !== "string" ||
            !("userEmail" in req.params) ||
            typeof req.params.userEmail !== "string"
        ) return res.sendStatus(400);

        const userEmail = req.params.userEmail;
        const projectId = req.params.projectId;
        const user = await userRepo.getUserByEmail(userEmail);

        if(!user) return res.sendStatus(404);
        
        await userRepo.addUserToProject(projectId, user.id, "CONTRIBUTOR");

        return res.sendStatus(204);
    } catch(e) {
        next(e);
    }

    return undefined;
}
