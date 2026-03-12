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
	id: string;
}

interface ProjectMetadata {
	title: string;
	description: string;
	status: Status;
	id: string;
}

interface User {
	email: string;
	id: string;
}

interface ProjectComment {
	user: string;
	title: string;
	id: string;
}
