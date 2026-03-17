import type { Request, Response } from "express";
import {
	generateAccessToken,
	generateRefreshToken,
	renewAccessToken,
	verifyRefreshToken,
	verifyUserCredentials,
	userDoesNotExist,
    renewRefreshToken,
} from "./authService.js";
import * as userRepo from "../users/userRepo.js";
import hashPassword from "../../shared/utils/hashPassword.js";

export async function register(
	req: Request,
	res: Response,
	next: (...args: any[]) => any,
) {
	try {
		const { email, password } = req.body;
		const doesNotExist = await userDoesNotExist(email);

		if (!doesNotExist) return res.sendStatus(204); // 204 to not expose internal user emails

		const hashed = await hashPassword(password);

		await userRepo.createNewUser(email, hashed);

		return res.sendStatus(204);
	} catch (e) {
		next(e);
	}

	return undefined;
}

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

		return res.json({ accessToken });
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
		if (!decodedUserData) return res.sendStatus(401);

		const accessToken = await renewAccessToken(decodedUserData);
		if (!accessToken) return res.sendStatus(403);

        const newRefreshToken = await renewRefreshToken(decodedUserData);
        if(!newRefreshToken) return res.sendStatus(403);

		res.cookie("refreshToken", newRefreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
		});

        return res.json({ accessToken });
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
