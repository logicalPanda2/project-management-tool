import express from "express";
import taskRouter from "../tasks/taskRouter.js";
import commentRouter from "../comments/commentRouter.js";

const projectRouter = express.Router();

projectRouter.get("/");
projectRouter.get("/:projectId");
projectRouter.post("/:projectId");
projectRouter.delete("/:projectId");
projectRouter.use("/:projectId/tasks", taskRouter);
projectRouter.use("/:projectId/comments", commentRouter);
projectRouter.post("/:projectId/members");

export default projectRouter;
