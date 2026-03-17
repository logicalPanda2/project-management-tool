import pool from "../../config/db.js";

export async function create(
	comment: ProjectComment,
	userId: string,
	projectId: string,
) {
	await pool?.query(
		`INSERT INTO comments (title, project_id, user_id, id) 
        VALUES ($1, $2, $3, $4);`,
		[comment.title, projectId, userId, comment.id],
	);
}

export async function deleteById(id: string) {
	await pool?.query(`DELETE FROM comments WHERE id = $1;`, [id]);
}

export async function getAllByProjectId(
	projectId: string,
): Promise<ProjectComment[]> {
	const result = await pool?.query(
		`SELECT c.title, c.id, u.email 
        FROM comments c
        INNER JOIN users u
        ON u.id = c.user_id
        WHERE c.project_id = $1;`,
		[projectId],
	);

	return result?.rows as ProjectComment[];
}

export async function getAssociatedUserId(
    commentId: string,
): Promise<{ user_id: string }> {
    const result = await pool?.query(
		`SELECT user_id FROM comments WHERE id = $1;`,
		[commentId],
	);

	return result?.rows[0] as { user_id: string };
}
