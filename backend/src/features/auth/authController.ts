import type { Request, Response } from "express";
import {
	generateAccessToken,
	generateRefreshToken,
	renewAccessToken,
	verifyRefreshToken,
	verifyUserCredentials,
} from "./authService.js";

export async function login(
	req: Request,
	res: Response,
	next: (...args: any[]) => any,
) {
	try {
		const { email, password } = req.body;

		const user = await verifyUserCredentials(email, password);

		if (!user) return res.status(401).send("Invalid Credentials");

		const accessToken = generateAccessToken(user);
		const refreshToken = generateRefreshToken(user);

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
		});

		res.json({ accessToken });
	} catch (e) {
		next(e);
	}

	return undefined;
}

export async function refresh(
	req: Request,
	res: Response,
	next: (...args: any[]) => any,
) {
	try {
		const refreshToken = req.cookies?.refreshToken;

		if (!refreshToken) return res.sendStatus(401);

		const decodedUserData = verifyRefreshToken(refreshToken);
		const accessToken = await renewAccessToken(decodedUserData);

		if (!accessToken) return res.sendStatus(403);

		res.json({ accessToken });
	} catch (e) {
		next(e);
	}

	return undefined;
}

export function logout(
	_req: Request,
	res: Response,
	next: (...args: any[]) => any,
) {
	try {
		res.cookie("refreshToken", "", {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			expires: new Date(0),
			maxAge: 0,
		});
	} catch (e) {
		next(e);
	}
}
