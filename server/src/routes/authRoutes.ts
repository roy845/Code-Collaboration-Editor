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
/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: User registration
 *     description: Register a new user with email, password, and username.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequestBody'
 *     responses:
 *       201:
 *         description: User successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponseDTO'
 *       400:
 *         description: Validation error.
 */
//Register || METHOD POST
router.post(
  "/register",
  validateRequest(registerSchema),
  AuthController.register
);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user with email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequestBody'
 *     responses:
 *       200:
 *         description: User successfully authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponseDTO'
 *       401:
 *         description: Invalid credentials.
 */
//Login || METHOD POST
router.post("/login", validateRequest(loginSchema), AuthController.login);

/**
 * @openapi
 * /api/auth/refresh-token:
 *   get:
 *     summary: Refresh access token
 *     description: Refresh the user's access token using a valid refresh token.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Token successfully refreshed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponseDTO'
 *       401:
 *         description: Invalid or expired refresh token.
 *     security:
 *       - cookieAuth: []
 */
//Refresh Token || METHOD GET
router.get("/refresh-token", AuthController.refreshToken);

/**
 * @openapi
 * /api/auth/logout:
 *   get:
 *     summary: User logout
 *     description: Log the user out and invalidate the refresh token.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: User successfully logged out.
 *       401:
 *         description: Unauthorized.
 *     security:
 *       - cookieAuth: []
 */
//Logout || METHOD GET
router.get("/logout", AuthController.logout);

/**
 * @openapi
 * /api/auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: Send a password reset email to the user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequestBody'
 *     responses:
 *       200:
 *         description: Password reset email sent.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForgotPasswordResponseDTO'
 *       400:
 *         description: Validation error or email not found.
 */
//Forgot Password || METHOD POST
router.post(
  "/forgot-password",
  validateRequest(forgotPasswordSchema),
  AuthController.forgotPassword
);

/**
 * @openapi
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password
 *     description: Reset the user's password using a token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequestBody'
 *     responses:
 *       200:
 *         description: Password successfully reset.
 *       400:
 *         description: Validation error or invalid token.
 */
//Reset Password || METHOD POST
router.post(
  "/reset-password",
  validateRequest(resetPasswordSchema),
  AuthController.resetPassword
);

export default router;
