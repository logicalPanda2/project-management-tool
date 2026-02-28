import express from "express";

const commentRouter = express.Router({ mergeParams: true });

commentRouter.get("/");
commentRouter.post("/");

export default commentRouter;
