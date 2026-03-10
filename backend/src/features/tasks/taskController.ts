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

        res.json({
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
            res.sendStatus(400);

        res.sendStatus(204);
    } catch(e) {
        next(e);
    }

    return undefined;
}

export async function remove(req: Request, res: Response, next: (...args: any[]) => any) {

}
