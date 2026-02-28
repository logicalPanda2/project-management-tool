import cookieParser from "cookie-parser";
import express from "express";
import logMiddleware from "./shared/middlewares/logMiddleware.js";
import errorMiddleware from "./shared/middlewares/errorMiddleware.js";
import _authMiddleware from "./shared/middlewares/authMiddleware.js";
import authRouter from "./features/auth/authRouter.js";
import projectRouter from "./features/projects/projectRouter.js";
import taskRouter from "./features/tasks/taskRouter.js";
import commentRouter from "./features/comments/commentRouter.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(logMiddleware);
// app.use(authMiddleware);

app.use("/auth", authRouter);
app.use("/project", projectRouter);
app.use("/tasks", taskRouter);
app.use("/comments", commentRouter);

app.use(errorMiddleware);

export default app;
