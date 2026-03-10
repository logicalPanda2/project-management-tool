import * as projectRepo from "./projectRepo.js";
import * as taskRepo from "./../tasks/taskRepo.js";
import * as commentRepo from "./../comments/commentRepo.js";

export async function getFullProjectData(id: string): Promise<Project | null> {
    const metadata: ProjectMetadata = await projectRepo.getById(id);
    const tasks: Task[] = await taskRepo.getAllByProjectId(id);
    const comments: ProjectComment[] = await commentRepo.getAllByProjectId(id);

    return {
        ...metadata,
        comments: [...comments],
        tasks: [...tasks],
        id: id,
    };
}
