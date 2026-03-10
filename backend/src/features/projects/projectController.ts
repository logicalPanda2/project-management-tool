import type { Request, Response } from "express"
import * as projectRepo from "./projectRepo.js";
import * as taskRepo from "./../tasks/taskRepo.js";
import * as commentRepo from "./../comments/commentRepo.js";

export async function getAllProjects(req: Request, res: Response, next: (...args: any[]) => any) {
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

export async function getProject(req: Request, res: Response, next: (...args: any[]) => any) {
    try {
        if(
            !("projectId" in req.params) ||
            typeof req.params.projectId !== "string"
        ) return res.send(400);

        const id = req.params.projectId;

        const metadata: ProjectMetadata = await projectRepo.getById(id);
        const tasks: Task[] = await taskRepo.getAllByProjectId(id);
        const comments: ProjectComment[] = await commentRepo.getAllByProjectId(id);

        return res.json({
            project: {
                ...metadata,
                comments: [...comments],
                tasks: [...tasks],
                id: id,
            } as Project
        });
    } catch(e) {
        next(e);
    }

    return undefined;
}

export function createProject() {

}

export function deleteProject() {

}

export function addUserToProject() {

}
