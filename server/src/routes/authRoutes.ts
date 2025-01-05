import { Router } from "express";
import AuthController from "../controllers/authController";
import validateRequest from "../middlewares/validateRegisterRequest.middleware";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../schemas/auth.schema";

const router = Router();

//Register || METHOD POST
router.post(
  "/register",
  validateRequest(registerSchema),
  AuthController.register
);

//Login || METHOD POST
router.post("/login", validateRequest(loginSchema), AuthController.login);

//Refresh Token || METHOD GET
router.get("/refresh-token", AuthController.refreshToken);

//Logout || METHOD GET
router.get("/logout", AuthController.logout);

//Forgot Password || METHOD POST
router.post(
  "/forgot-password",
  validateRequest(forgotPasswordSchema),
  AuthController.forgotPassword
);

//Reset Password || METHOD POST
router.post(
  "/reset-password",
  validateRequest(resetPasswordSchema),
  AuthController.resetPassword
);

export default router;
