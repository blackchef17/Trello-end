import { Router } from "express";
import { register, refreshAccessToken, forgotPassword, resetPassword } from "../controllers/user-controller.js";

const router = Router();

router.post("/register", register);
router.post("/refresh", refreshAccessToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
export default router;