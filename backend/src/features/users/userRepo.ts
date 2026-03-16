import pool from "../../config/db.js";

export async function getUserByEmail(email: string): Promise<UserConfidentialData | undefined> {
	const result = await pool?.query(
		`SELECT id, email, password FROM users WHERE email = $1;`,
		[email],
	);

	return result?.rows[0];
}

export async function getAllByProjectId(projectId: string): Promise<User[]> {
    const result = await pool?.query(
		`SELECT u.email, u.id
        FROM users u
        INNER JOIN user_projects up
        ON u.id = up.user_id
        WHERE up.project_id = $1;`,
		[projectId],
	);

	return result?.rows as User[];
}

export async function getUserById(id: string): Promise<UserConfidentialData | undefined> {
	const result = await pool?.query(
		`SELECT id, email, password FROM users WHERE id = $1;`,
		[id],
	);

	return result?.rows[0];
}

export async function createNewUser(
	email: string,
	hashedPw: string,
): Promise<void> {
	await pool?.query(
		`INSERT INTO users (email, password)
        VALUES($1, $2);`,
		[email, hashedPw],
	);
}

export async function addUserToProject(
	projectId: string,
	userId: string,
	role: UserRole,
) {
	await pool?.query(
		`INSERT INTO user_projects (project_id, user_id, user_role)
        VALUES ($1, $2, $3);`,
		[projectId, userId, role],
	);
}

export async function getRole(
    userId: string,
    projectId: string,
) {
    const result = await pool?.query(
        `SELECT u.email, up.user_role
        FROM users u 
        INNER JOIN user_projects up 
        ON u.id = up.user_id 
        WHERE u.id = $1 AND up.project_id = $2;`,
        [userId, projectId]
    );

    return result?.rows[0] as {
        user_role: UserRole,
        email: string,
    };
}
