import type { DecodedUserData } from "../user.ts";
import type { Express } from "express";

declare global {
	namespace Express {
		interface Request {
			user?: DecodedUserData;
		}
	}
}

export {};
