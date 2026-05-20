import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import userTeamRoutes from "./teamRoutes.js";
import {
  registerUserController,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  loginUserController,
} from "../controllers/user-controller.js";


const userRouter = Router();

userRouter.post("/register", registerUserController);

userRouter.post("/login", loginUserController);

userRouter.post("/refresh", refreshAccessToken);

userRouter.post("/forgot-password", forgotPassword);

userRouter.post("/reset-password", resetPassword);

userRouter.use("/teams", authenticate, userTeamRoutes);

export default userRouter;
