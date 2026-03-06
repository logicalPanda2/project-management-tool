export function createInsertQueryForNTasks(taskArrLen: number) {
    let query = "INSERT INTO tasks (id, title, status, project_id) VALUES";

    for(let i = 0; i < taskArrLen; i += 4) {
        query += `\n($${i + 1}, $${i + 2}, $${i + 3}, $${i + 4})`;
    }

    query += ";";

    return query;
}

export function createDataArrForNTasks(tasks: Task[], projectId: string) {
    const data: string[] = [];
    
    tasks.map(t => {
        const tuple = [t.id, t.title, t.status, projectId];

        data.push(...tuple);
    });

    return data;
}
