import { addNewTasks } from "./taskModel.js";

export function createInsertQueryForNTasks(taskArrLen: number) {
    const baseQuery = "INSERT INTO tasks (id, title, status, project_id) VALUES";
    const placeholders = [];
    const placeholdersPerInsert = 4;

    for(let i = 1; i <= taskArrLen; i++) {
        const n = placeholdersPerInsert * i;
        placeholders.push(`($${n - 3}, $${n - 2}, $${n - 1}, $${n})`);
    }

    return `${baseQuery}${placeholders.join(",")};`;
}

export function createDataArrForNTasks(tasks: Task[], projectId: string) {
    return tasks.flatMap(t => [t.id, t.title, t.status, projectId]);
}

export function createManyTasks(tasks: Task[], projectId: string) {
    const query = createInsertQueryForNTasks(tasks.length);
    const data = createDataArrForNTasks(tasks, projectId);

    addNewTasks(query, data);
}
