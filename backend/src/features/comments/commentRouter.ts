import express from "express";
import * as Controllers from "./commentController.js";
import requireRole from "../../shared/middlewares/requireRole.js";
import guardCommentDeletion from "./guardCommentDeletion.js";

const commentRouter = express.Router({ mergeParams: true });

commentRouter.get("/", requireRole("CONTRIBUTOR"), Controllers.getAll);
commentRouter.post("/", requireRole("CONTRIBUTOR"), Controllers.create);
commentRouter.delete("/:commentId", guardCommentDeletion, Controllers.remove);

export default commentRouter;
