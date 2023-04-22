import { Router } from "express";
import { createuser } from "../controllers/usersController.js";

const userRouter = Router();

userRouter.post("/register", createuser);

export default userRouter;
