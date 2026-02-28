import express from "express";

const commentRouter = express.Router({ mergeParams: true });

commentRouter.get("/");
commentRouter.post("/");
commentRouter.delete("/:commentId");

export default commentRouter;
