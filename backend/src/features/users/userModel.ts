import pool from "../../config/db.js";

export async function getUserByEmail(email: string): Promise<User> {
    const result = await pool?.query(
        `SELECT id, email, password FROM users WHERE email = $1;`,
        [email]
    );

    return result?.rows[0];
}
