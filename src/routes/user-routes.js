import { Router } from "express";
import { registerUserController, refreshAccessToken, forgotPassword, resetPassword, loginUserController } from "../controllers/user-controller.js";

const router = Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController)
router.post("/refresh", refreshAccessToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
export default router;