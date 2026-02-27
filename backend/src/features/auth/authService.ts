import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function generateAccessToken(user: User) {
    if(
        !process.env.JWT_ACCESS_SECRET ||
        !process.env.JWT_REFRESH_SECRET ||
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
