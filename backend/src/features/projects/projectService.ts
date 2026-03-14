import * as projectRepo from "./projectRepo.js";
import * as taskRepo from "./../tasks/taskRepo.js";
import * as commentRepo from "./../comments/commentRepo.js";
import * as userRepo from "./../users/userRepo.js";

export async function getFullProjectData(id: string): Promise<{
    metadata: Project,
    comments: ProjectComment[] | null,
    tasks: Task[] | null,
}> {
	const metadata = await projectRepo.getById(id);
	if (!metadata) throw new Error("Invalid Project ID");

	const tasks: Task[] = await taskRepo.getAllByProjectId(id);
	const comments: ProjectComment[] = await commentRepo.getAllByProjectId(id);

	return {
		metadata: {
            ...metadata,
        },
		comments: comments && comments.length !== 0 ? [...comments] : null,
		tasks: tasks && tasks.length !== 0 ? [...tasks] : null,
	};
}

export async function upsert(newProject: Project, tasks: Task[], userEmail: string) {
	const project = await projectRepo.getById(newProject.id);

	if (!project) {
		const user = await userRepo.getUserByEmail(userEmail);
		if (!user) return false;

		await projectRepo.create(newProject);
        await taskRepo.createMany(tasks, newProject.id);
		await userRepo.addUserToProject(newProject.id, user.id, "CREATOR");

		return true;
	} else {
		await projectRepo.updateById(newProject.id, newProject);

		return true;
	}
}
