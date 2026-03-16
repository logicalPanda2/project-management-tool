import express from "express";
import taskRouter from "../tasks/taskRouter.js";
import commentRouter from "../comments/commentRouter.js";
import * as Controllers from "./projectController.js";
import requireRole from "../../shared/middlewares/requireRole.js";

const projectRouter = express.Router();

projectRouter.get("/", Controllers.getAll);
projectRouter.get("/:projectId", requireRole("CONTRIBUTOR"), Controllers.getById);
projectRouter.post("/:projectId", requireRole("CREATOR"), Controllers.createOrUpdate);
projectRouter.delete("/:projectId", requireRole("CREATOR"), Controllers.deleteById);
projectRouter.use("/:projectId/tasks", taskRouter);
projectRouter.use("/:projectId/comments", commentRouter);
projectRouter.post("/:projectId/members", requireRole("CREATOR"), Controllers.invite);
projectRouter.get("/:projectId/role", requireRole("CONTRIBUTOR"), Controllers.getRole);

export default projectRouter;
