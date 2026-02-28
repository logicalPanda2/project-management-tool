import express from "express";

const taskRouter = express.Router({ mergeParams: true });

taskRouter.get("/");
taskRouter.post("/");
taskRouter.delete("/:taskId");

export default taskRouter;
