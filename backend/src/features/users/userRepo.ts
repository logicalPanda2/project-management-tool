import pool from "../../config/db.js";

export async function getUserByEmail(email: string): Promise<User | undefined> {
	const result = await pool?.query(
		`SELECT id, email, password FROM users WHERE email = $1;`,
		[email],
	);

	return result?.rows[0];
}

export async function getUserById(id: string): Promise<User | undefined> {
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
