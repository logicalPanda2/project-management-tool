export default function isProject(project: unknown): project is Project {
	if (
		typeof project !== "object" ||
		project === null ||
		!("id" in project) ||
		!("title" in project) ||
		!("description" in project) ||
		!("status" in project) ||
		typeof project.id !== "string" ||
		typeof project.title !== "string" ||
		typeof project.description !== "string" ||
		typeof project.status !== "string"
	)
		return false;

	return true;
}

export function isTaskArray(tasks: unknown): tasks is Task[] {
	if (!Array.isArray(tasks)) return false;
	if (tasks.length !== 0) {
		const task: unknown = tasks[0];

		if (!isTask(task)) return false;
	}

	return true;
}

export function isTask(task: unknown): task is Task {
	if (
		typeof task !== "object" ||
		task === null ||
		!("title" in task) ||
		!("status" in task) ||
		!("id" in task) ||
		typeof task.title !== "string" ||
		typeof task.status !== "string" ||
		typeof task.id !== "string"
	)
		return false;

	return true;
}

export function isCommentArray(
	comments: unknown,
): comments is ProjectComment[] {
	if (!Array.isArray(comments)) return false;
	if (comments.length !== 0) {
		const comment: unknown = comments[0];

		if (!isComment(comment)) return false;
	}

	return true;
}

export function isComment(comment: unknown): comment is ProjectComment {
	if (
		typeof comment !== "object" ||
		comment === null ||
		!("title" in comment) ||
		typeof comment.title !== "string"
	)
		return false;

	return true;
}
