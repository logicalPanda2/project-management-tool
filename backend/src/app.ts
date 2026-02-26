import cookieParser from "cookie-parser";
import express from "express";
import logMiddleware from "./shared/logMiddleware.js";
import errorMiddleware from "./shared/errorMiddleware.js";
import authMiddleware from "./shared/authMiddleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(logMiddleware);
app.use(authMiddleware);

// routes

app.use(errorMiddleware);

export default app;
