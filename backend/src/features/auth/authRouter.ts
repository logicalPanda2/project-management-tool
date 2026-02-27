import express from "express";
import { login, refresh, logout } from "./authController.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/refresh", refresh);

export default authRouter;
