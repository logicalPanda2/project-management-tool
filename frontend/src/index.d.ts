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
type UserRole = "CONTRIBUTOR" | "CREATOR";
interface User {
	email: string;
	id: string;
}
