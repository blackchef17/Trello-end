import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import userTeamRoutes from "./teamRoutes.js";
import {
  registerUserController,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  loginUserController,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.use("/teams", authenticate, userTeamRoutes);

userRouter.post("/register", registerUserController);

userRouter.post("/login", loginUserController);

userRouter.post("/refresh", refreshAccessToken);

userRouter.post("/forgot-password", forgotPassword);

userRouter.post("/reset-password", resetPassword);

export default userRouter;
