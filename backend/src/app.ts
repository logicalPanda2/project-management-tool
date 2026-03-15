import cookieParser from "cookie-parser";
import express from "express";
import logMiddleware from "./shared/middlewares/logMiddleware.js";
import errorMiddleware from "./shared/middlewares/errorMiddleware.js";
import authMiddleware from "./shared/middlewares/authMiddleware.js";
import authRouter from "./features/auth/authRouter.js";
import projectRouter from "./features/projects/projectRouter.js";
import taskRouter from "./features/tasks/taskRouter.js";
import commentRouter from "./features/comments/commentRouter.js";
import userRouter from "./features/users/userRouter.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(logMiddleware);
app.use("/auth", authRouter);

app.use(authMiddleware);

app.use("/projects", projectRouter);
app.use("/tasks", taskRouter);
app.use("/comments", commentRouter);
app.use("/users", userRouter);

app.use(errorMiddleware);

export default app;
