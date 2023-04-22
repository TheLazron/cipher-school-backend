import { Router } from "express";
import {
  createuser,
  login,
  updateUser,
} from "../controllers/usersController.js";

const userRouter = Router();

userRouter.post("/register", createuser);

userRouter.post("/login", login);

userRouter.post("/updateUser", updateUser);

export default userRouter;
