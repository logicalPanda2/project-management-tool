import express from "express";
import * as Controllers from "./userController.js";

const userRouter = express.Router();

userRouter.get("/:projectId", Controllers.verifyRole);

export default userRouter;
