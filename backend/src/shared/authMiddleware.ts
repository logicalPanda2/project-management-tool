import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type { Request, Response } from "express";

dotenv.config();

export default function auth(
	req: Request,
	res: Response,
	next: (...params: any[]) => any,
) {
	if (!process.env.JWT_ACCESS_SECRET)
		throw new Error(
			"Secret access key not configured. Check .env.example for more information.",
		);

	const authHeader = req.headers.authorization;

	if (!authHeader) return res.sendStatus(401);

	const token = authHeader.split(" ")[1];

	if (!token) return res.sendStatus(401);

	try {
		const user = jwt.verify(
			token,
			process.env.JWT_ACCESS_SECRET,
		) as User;
		req.user = user;
		next();
	} catch (e) {
		return res.sendStatus(401);
	}

    return undefined;
}
