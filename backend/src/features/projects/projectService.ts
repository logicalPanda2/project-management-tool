import * as projectRepo from "./projectRepo.js";
import * as taskRepo from "./../tasks/taskRepo.js";
import * as commentRepo from "./../comments/commentRepo.js";
import * as userRepo from "./../users/userRepo.js";
import HttpError from "../../shared/classes/HttpError.js";

export async function getFullProjectData(id: string): Promise<{
    metadata: Project,
    comments: ProjectComment[],
    tasks: Task[],
    members: User[],
}> {
	const metadata = await projectRepo.getById(id);
    if(!metadata) throw new HttpError(404, "Not Found");

	const tasks: Task[] = await taskRepo.getAllByProjectId(id);
	const comments: ProjectComment[] = await commentRepo.getAllByProjectId(id);
    const members: User[] = await userRepo.getAllByProjectId(id);

	return {
		metadata,
		comments: comments && comments.length !== 0 ? comments : [],
		tasks,
        members,
	};
}

export async function upsert(
    newProject: Project, 
    tasks: Task[], 
    members: User[], 
    userEmail: string
) {
    // crude delete-all remake-all logic, and
    // large room for performance optimization
    // FIX LATER
	const project = await projectRepo.getById(newProject.id);
    const comments = project ? await commentRepo.getAllByProjectId(newProject.id) : [];
    if(project) await projectRepo.deleteById(project.id);

    const user = await userRepo.getUserByEmail(userEmail);
    if (!user) return false;

    await projectRepo.create(newProject);
    await taskRepo.createMany(tasks, newProject.id);
    // temporary assertion
    for(const c of comments as {
        title: string,
        id: string,
        email: string,
        user: string,
    }[]) {
        const user = await userRepo.getUserByEmail(c.email);
        if(!user) continue;
        await commentRepo.create(c, user.id, newProject.id);
    }
    await userRepo.addUserToProject(newProject.id, user.id, "CREATOR");
    for(const m of members) {
        const contributor = await userRepo.getUserByEmail(m.email);
        if(!contributor || contributor.id === user.id) continue;
        await userRepo.addUserToProject(newProject.id, contributor.id, "CONTRIBUTOR");
    }

    return true;
}
