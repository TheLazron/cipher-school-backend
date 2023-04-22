import { Router } from "express";
import {
  changePassword,
  createuser,
  getFollowers,
  login,
  updateIntersts,
  updateUser,
} from "../controllers/usersController.js";

const userRouter = Router();

userRouter.post("/register", createuser);

userRouter.post("/login", login);

userRouter.post("/updateUser", updateUser);

userRouter.post("/updatePass", changePassword);

userRouter.post("/updateInterests", updateIntersts);

userRouter.get("/getFollowers", getFollowers);

export default userRouter;
