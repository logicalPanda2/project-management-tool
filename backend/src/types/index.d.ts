type Status = "COMPLETE" | "INCOMPLETE";

interface Task {
	title: string;
	status: Status;
	id: string;
}

interface Project {
	title: string;
	description: string;
	status: Status;
	tasks: Task[];
	id: string;
}

interface ProjectMetadata {
    title: string;
	description: string;
	status: Status;
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
