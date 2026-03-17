import express from "express";
import * as Controllers from "./taskController.js";
import requireRole from "../../shared/middlewares/requireRole.js";

const taskRouter = express.Router({ mergeParams: true });

taskRouter.get("/", requireRole("CONTRIBUTOR"), Controllers.getAll);
taskRouter.post("/", requireRole("CREATOR"), Controllers.create);
taskRouter.post("/:taskId", requireRole("CONTRIBUTOR"), Controllers.update);
taskRouter.delete("/:taskId", requireRole("CREATOR"), Controllers.remove);

export default taskRouter;
