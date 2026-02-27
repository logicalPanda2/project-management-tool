import express from "express";
import { getCredentials, getNewAccessToken, deleteCredentials } from "./authController.js";

const authRouter = express.Router();

authRouter.post("/login", getCredentials);
authRouter.post("/refresh", getNewAccessToken);
authRouter.post("/logout", deleteCredentials);

export default authRouter;
