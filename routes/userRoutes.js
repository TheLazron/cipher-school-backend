import { Router } from "express";
import {
  changePassword,
  createuser,
  login,
  updateUser,
} from "../controllers/usersController.js";

const userRouter = Router();

userRouter.post("/register", createuser);

userRouter.post("/login", login);

userRouter.post("/updateUser", updateUser);

userRouter.post("/updatePass", changePassword);

export default userRouter;
