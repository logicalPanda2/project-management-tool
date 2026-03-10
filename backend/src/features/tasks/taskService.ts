import * as taskRepo from "./taskRepo.js";
import { isTask, isTaskArray } from "../../shared/utils/typeGuards.js";

export async function createOrCreateMany(tasks: unknown, projectId: string) {
    if(isTaskArray(tasks)) {
        const task = tasks[0];
        if(isTask(task)) await taskRepo.createMany(tasks, projectId);

        return true;
    } else if(isTask(tasks)) {
        await taskRepo.create(tasks, projectId);

        return true;
    } else {
        return false;
    }
}
