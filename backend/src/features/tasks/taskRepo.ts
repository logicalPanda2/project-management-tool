import pool from "../../config/db.js";
import addBulkInsertPlaceholders from "../../shared/utils/addBulkInsertPlaceholders.js";

export async function create(task: Task, projectId: string) {
    await pool?.query(
        `
        INSERT INTO tasks (id, title, status, project_id)
        VALUES ($1, $2, $3, $4);
        `,
        [task.id, task.title, task.status, projectId]
    );
}

export async function createMany(tasks: Task[], projectId: string) {
    const query = addBulkInsertPlaceholders("INSERT INTO tasks (id, title, status, project_id) VALUES", 4, tasks.length);
    const data = tasks.flatMap(t => [t.id, t.title, t.status, projectId]);

    await pool?.query(
        query,
        data
    );
}

export async function updateById(id: string, newTask: Task) {
    await pool?.query(
        `UPDATE tasks SET title = $1, status = $2
        WHERE id = $3;`,
        [newTask.title, newTask.status, id]
    );
}
