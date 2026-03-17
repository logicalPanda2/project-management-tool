import express from "express";
import { login, refresh, logout, register } from "./authController.js";
import authMiddleware from "../../shared/middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", authMiddleware, logout);
authRouter.post("/refresh", refresh);

export default authRouter;
