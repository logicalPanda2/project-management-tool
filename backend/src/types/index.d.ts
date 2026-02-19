type Status = "COMPLETE" | "INCOMPLETE";

interface Task {
    title: string,
    status: Status,
    id: string,
}

interface Project {
    title: string,
    description: string,
    status: Status,
    tasks: Task[],
    id: string,
}

interface User {
    email: string,
    password: string,
}
