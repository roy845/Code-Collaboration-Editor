import { NextFunction, Request, Response } from "express";
import {
  CookieRequest,
  LoginRequestBody,
  LoginResponseDTO,
  RegisterRequestBody,
} from "../types/authTypes";
import AuthService from "../services/authService";
import { HttpStatus } from "../constants/httpStatus";

class AuthController {
  static async register(
    req: Request<{}, {}, RegisterRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password, username } = req.body;
      const registerDto: RegisterRequestBody = { email, password, username };
      const { message, user } = await AuthService.register(registerDto);
      res.status(HttpStatus.CREATED).json({ message, user });
    } catch (error) {
      next(error);
    }
  }

  static async login(
    req: Request<{}, {}, LoginRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const loginDto: LoginRequestBody = { email, password };
      const { message, accessToken, refreshToken }: LoginResponseDTO =
        await AuthService.login(loginDto);

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(HttpStatus.OK).json({ message, accessToken, refreshToken });
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(
    req: CookieRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await AuthService.refreshToken(req, res);
    } catch (error) {
      next(error);
    }
  }

  static async logout(
    req: CookieRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await AuthService.logout(req, res);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
