import { Router } from "express";
import AuthController from "../controllers/authController";
import validateRequest from "../middlewares/validateRegisterRequest.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

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

export default router;
