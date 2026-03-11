type Status = "COMPLETE" | "INCOMPLETE";
type UserRole = "CONTRIBUTOR" | "CREATOR";

interface Task {
	title: string;
	status: Status;
	id: string;
}

interface Project {
	title: string;
	description: string;
	status: Status;
	tasks: Task[] | null;
    comments: ProjectComment[] | null;
	id: string;
}

interface ProjectComment {
    title: string,
}

interface ProjectMetadata {
    title: string;
	description: string;
	status: Status;
    id: string;
}

interface User {
	email: string;
	password: string;
	id: string;
}

interface SentUserData {
	email: string;
	password: string;
}

interface DecodedUserData {
    id: string,
    email: string,
}

interface HttpError extends Error {
	status: number;
}
