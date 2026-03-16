import express from "express";
import taskRouter from "../tasks/taskRouter.js";
import commentRouter from "../comments/commentRouter.js";
import * as Controllers from "./projectController.js";

const projectRouter = express.Router();

projectRouter.get("/", Controllers.getAll);
projectRouter.get("/:projectId", Controllers.getById);
projectRouter.post("/:projectId", Controllers.createOrUpdate);
projectRouter.delete("/:projectId", Controllers.deleteById);
projectRouter.use("/:projectId/tasks", taskRouter);
projectRouter.use("/:projectId/comments", commentRouter);
projectRouter.post("/:projectId/members", Controllers.invite);
projectRouter.get("/:projectId/role", Controllers.getRole);

export default projectRouter;
