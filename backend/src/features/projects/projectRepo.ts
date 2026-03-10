import pool from "../../config/db.js";

export async function getAllByUserId(userId: string): Promise<ProjectMetadata[]> {
    const result = await pool?.query(
        `SELECT
            p.title,
            p.description,
            p.status,
            p.id
        FROM
            projects p
        JOIN
            user_projects up ON p.id = up.project_id
        WHERE
            up.user_id = $1;
        `,
        [userId]
    );
    const rows = result?.rows;

    return rows ? rows : [];
}

export async function getById(id: string): Promise<ProjectMetadata | null> {
    const result = await pool?.query(
        `SELECT title, description, status, id FROM projects WHERE id = $1;`,
        [id]
    );

    return result?.rows[0] ?? null;
}

export async function create(project: Project) {
    await pool?.query(
        `INSERT INTO projects (id, title, description, status)
        VALUES ($1, $2, $3, $4);`,
        [project.id, project.title, project.description, project.status]
    );
}

export async function deleteById(projectId: string) {
    await pool?.query(
        `DELETE FROM projects WHERE id = $1;`,
        [projectId]
    );
}

export async function updateById(id: string, newProject: Project) {
    await pool?.query(
        `UPDATE projects SET title = $1, description = $2, status = $3
        WHERE id = $4;`,
        [newProject.title, newProject.description, newProject.status, id]
    );
}
