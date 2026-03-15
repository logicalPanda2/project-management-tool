import * as projectRepo from "./projectRepo.js";
import * as taskRepo from "./../tasks/taskRepo.js";
import * as commentRepo from "./../comments/commentRepo.js";
import * as userRepo from "./../users/userRepo.js";

export async function getFullProjectData(id: string): Promise<{
    metadata: Project,
    comments: ProjectComment[] | null,
    tasks: Task[] | null,
    members: User[] | null,
}> {
	const metadata = await projectRepo.getById(id);
	if (!metadata) throw new Error("Invalid Project ID");

	const tasks: Task[] = await taskRepo.getAllByProjectId(id);
	const comments: ProjectComment[] = await commentRepo.getAllByProjectId(id);
    const members: User[] = await userRepo.getAllByProjectId(id);

	return {
		metadata,
		comments: comments && comments.length !== 0 ? comments : null,
		tasks,
        members,
	};
}

export async function upsert(
    newProject: Project, 
    tasks: Task[], 
    members: {email: string}[], 
    userEmail: string
) {
	const project = await projectRepo.getById(newProject.id);

	if (!project) {
		const user = await userRepo.getUserByEmail(userEmail);
		if (!user) return false;

		await projectRepo.create(newProject);
        await taskRepo.createMany(tasks, newProject.id);
		await userRepo.addUserToProject(newProject.id, user.id, "CREATOR");
        // large room for optimization. fix later at refactor phase
        for(const m of members) {
            const member = await userRepo.getUserByEmail(m.email);
            if(!member) continue;
            await userRepo.addUserToProject(newProject.id, member.id, "CONTRIBUTOR");
        }

		return true;
	} else {
		await projectRepo.updateById(newProject.id, newProject);

		return true;
	}
}
