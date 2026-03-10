import * as projectRepo from "./projectRepo.js";
import * as taskRepo from "./../tasks/taskRepo.js";
import * as commentRepo from "./../comments/commentRepo.js";

export async function getFullProjectData(id: string): Promise<Project | null> {
    const metadata = await projectRepo.getById(id);
    if(!metadata) throw new Error("Invalid Project ID");

    const tasks: Task[] = await taskRepo.getAllByProjectId(id);
    const comments: ProjectComment[] = await commentRepo.getAllByProjectId(id);

    return {
        ...metadata,
        comments: [...comments],
        tasks: [...tasks],
        id: id,
    };
}

export async function upsert(newProject: Project) {
    const project = await projectRepo.getById(newProject.id);
    
    if(!project) {
        await projectRepo.create(newProject);
    } else {
        await projectRepo.updateById(newProject.id, newProject);
    }
}
