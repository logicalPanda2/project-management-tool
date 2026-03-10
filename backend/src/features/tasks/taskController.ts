import type { Request, Response } from "express";
import * as taskRepo from "./taskRepo.js";
import * as Services from "./taskService.js";

export async function getAll(req: Request, res: Response, next: (...args: any[]) => any) {
    try {
        if(
            !("projectId" in req.params) ||
            typeof req.params.projectId !== "string"
        ) return res.sendStatus(400);

        const projectId = req.params.projectId;
        const tasks = await taskRepo.getAllByProjectId(projectId);

        return res.json({
            tasks: tasks
        });
    } catch(e) {
        next(e);
    }

    return undefined;
}

export async function create(req: Request, res: Response, next: (...args: any[]) => any) {
    try {
        if(
            !("projectId" in req.params) ||
            typeof req.params.projectId !== "string"
        ) return res.sendStatus(400);

        const projectId = req.params.projectId;
        const tasks = req.body;

        if(!(await Services.createOrCreateMany(tasks, projectId)))
            return res.sendStatus(400);

        return res.sendStatus(204);
    } catch(e) {
        next(e);
    }

    return undefined;
}

export async function remove(req: Request, res: Response, next: (...args: any[]) => any) {
    try {
        if(
            !("taskId" in req.params) ||
            typeof req.params.taskId !== "string"
        ) return res.sendStatus(400);

        const id = req.params.taskId;

        await taskRepo.deleteById(id);

        return res.sendStatus(204);
    } catch(e) {
        next(e);
    }

    return undefined;
}
