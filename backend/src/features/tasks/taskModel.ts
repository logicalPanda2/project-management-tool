import pool from "../../config/db.js";

export async function addNewTask(task: Task, projectId: string) {
    await pool?.query(
        `
        INSERT INTO tasks (id, title, status, project_id)
        VALUES ($1, $2, $3, $4);
        `,
        [task.id, task.title, task.status, projectId]
    );
}

export async function addNewTasks(tasks: Task[], projectId: string) {
    function createInsertQueryForNTasks(taskArrLen: number) {
        const baseQuery = "INSERT INTO tasks (id, title, status, project_id) VALUES";
        const placeholders = [];
        const placeholdersPerInsert = 4;

        for(let i = 1; i <= taskArrLen; i++) {
            const n = placeholdersPerInsert * i;
            placeholders.push(`($${n - 3}, $${n - 2}, $${n - 1}, $${n})`);
        }

        return `${baseQuery}${placeholders.join(",")};`;
    }

    const query = createInsertQueryForNTasks(tasks.length);
    const data = tasks.flatMap(t => [t.id, t.title, t.status, projectId]);

    await pool?.query(
        query,
        data
    );
}
