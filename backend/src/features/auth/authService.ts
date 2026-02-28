import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getUserByEmail } from "../users/userModel.js";
import bcrypt from "bcryptjs";

dotenv.config();

export function generateAccessToken(user: User) {
    if(
        !process.env.JWT_ACCESS_SECRET ||
        !process.env.ACCESS_TOKEN_DURATION
    ) throw new Error("Secret keys not configured. Check .env.example for more information.");

    return jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_DURATION as any },
    );

    // assert as any to bypass StringValue type limitations on parameter
    // as reverse engineering the type definition isn't worth it.
    // make sure that the env variable complies with the "[number][m | d]" format

    // will upgrade to safer and more robust version in due time.
}

export function generateRefreshToken(user: User) {
    if(
        !process.env.JWT_REFRESH_SECRET ||
        !process.env.REFRESH_TOKEN_DURATION
    ) throw new Error("Secret keys not configured. Check .env.example for more information.");

    return jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_DURATION as any },
    );

    // same reason for as any assertion as explained above
}

export function verifyRefreshToken(token: string) {
    if(!process.env.JWT_REFRESH_SECRET)
        throw new Error("Secret keys not configured. Check .env.example for more information.");

    return jwt.verify(token, process.env.JWT_REFRESH_SECRET) as { id: string };
}

export async function verifyUserCredentials(
    email: string, 
    password: string
): Promise<null | User> {
    const user = await getUserByEmail(email);

    if(!user) return null;
    if(user.email !== email) return null;
    if(await bcrypt.compare(password, user.password)) return null;

    return user;
}
