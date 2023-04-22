import { Router } from "express";
import { createuser, login } from "../controllers/usersController.js";

const userRouter = Router();

userRouter.post("/register", createuser);

userRouter.post("/login", login);

export default userRouter;
