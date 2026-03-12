// PROJECTS
type Status = "COMPLETE" | "INCOMPLETE"
interface Project {
	title: string;
	description: string;
	status: Status;
	id: string;
}
interface Task {
	title: string;
	status: Status;
	id: string;
}
interface ProjectComment {
	title: string;
	id: string;
    user: string;
}

// USERS
type UserRole = "CREATOR" | "CONTRIBUTOR";
interface UserConfidentialData {
	email: string;
	password: string;
	id: string;
}
interface User {
	email: string;
    id: string;
}

// ERRORS
interface HttpError extends Error {
	status: number;
}
