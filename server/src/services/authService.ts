import AuthDal from "../dal/authDal";
import { IUser, UserRole } from "../models/user.model";
import {
  CookieRequest,
  CustomJWTPayload,
  ForgotPasswordRequestBody,
  ForgotPasswordResponseDTO,
  JWTPayload,
  LoginRequestBody,
  LoginResponseDTO,
  RegisterRequestBody,
  ResetPasswordDTO,
  ResetPasswordRequestBody,
  UserResponseDTO,
} from "../types/authTypes";
import Utils from "../utils/utils";
import { CustomError } from "../utils/customError";
import { Response } from "express";
import { HttpStatus } from "../constants/httpStatus";
import ResetPasswordTemplate from "../templates/resetPassword";
import mailService from "./mailService";
import { CronJob } from "cron";
import { BASE_URL } from "../config/urls";

class AuthService {
  private static readonly EXPIRES_AT: number = 15 * 60 * 1000;
  private static schedulerRegistry: Map<string, CronJob> = new Map<
    string,
    CronJob
  >();

  static async register(
    registerDto: RegisterRequestBody
  ): Promise<UserResponseDTO> {
    const { email, password, username } = registerDto;

    const hashedPassword: string = await Utils.hashPassword(password);

    const newUser = await AuthDal.createUser({
      username,
      email,
      password: hashedPassword,
      roles: [UserRole.USER],
      resetPassword: { token: "", expires: new Date() },
      refreshToken: "",
    });

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return {
      message: `User ${newUser.username} created Successfully !`,
      user: userWithoutPassword,
    };
  }

  static async login(loginDto: LoginRequestBody): Promise<LoginResponseDTO> {
    const { email, password } = loginDto;

    const foundUser: IUser | null = await AuthDal.findUserByEmail(email);

    if (!foundUser) {
      throw new CustomError(
        `User with an email: ${email} not found`,
        HttpStatus.NOT_FOUND
      );
    }

    if (await Utils.comparePassword(password, foundUser.password)) {
      const payload: JWTPayload = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        roles: foundUser.roles,
      };

      const [accessToken, refreshToken] = Utils.generateTokens(payload);

      foundUser.refreshToken = refreshToken;
      await AuthDal.saveUser(foundUser);

      return {
        message: `User ${foundUser.username} login Successfully !`,
        accessToken,
        refreshToken,
      };
    } else {
      throw new CustomError(`Unauthorized`, HttpStatus.UNAUTHORIZED);
    }
  }

  static async refreshToken(req: CookieRequest, res: Response) {
    const cookies = req.cookies;

    if (!cookies.jwt) return res.sendStatus(HttpStatus.UNAUTHORIZED);
    const refreshToken: string = cookies.jwt;

    const foundUser: IUser | null = await AuthDal.findUserByRefreshToken(
      refreshToken
    );

    if (!foundUser) return res.sendStatus(HttpStatus.FORBIDDEN);

    const payload: JWTPayload = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      roles: foundUser.roles,
    };

    try {
      const decoded: CustomJWTPayload = Utils.verfiyJWTToken(refreshToken);
      if (foundUser.username !== decoded.username) {
        res.sendStatus(HttpStatus.FORBIDDEN);
      }

      const accessToken: string = Utils.generateAccessToken(payload);

      res
        .status(HttpStatus.OK)
        .json({ accessToken, message: `access token refreshed successfully` });
      return {
        accessToken,
        message: `access token refreshed successfully`,
      };
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        throw new CustomError("Refresh token expired", HttpStatus.UNAUTHORIZED);
      }
      return res.sendStatus(HttpStatus.FORBIDDEN);
    }
  }

  static async logout(req: CookieRequest, res: Response) {
    const cookies = req.cookies;

    if (!cookies.jwt) {
      return res.sendStatus(HttpStatus.NO_CONTENT);
    }

    const refreshToken: string = cookies.jwt;

    const foundUser: IUser | null = await AuthDal.findUserByRefreshToken(
      refreshToken
    );

    if (!foundUser) {
      res.cookie("jwt", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(0),
      });
      return res.sendStatus(HttpStatus.NO_CONTENT);
    } else {
      foundUser.refreshToken = "";
      await AuthDal.saveUser(foundUser);

      res.cookie("jwt", "", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(0),
      });
      return res.sendStatus(HttpStatus.NO_CONTENT);
    }
  }

  static async forgotPassword(
    forgotPasswordDto: ForgotPasswordRequestBody
  ): Promise<ForgotPasswordResponseDTO> {
    const { email } = forgotPasswordDto;
    const user: IUser | null = await AuthDal.findUserByEmail(email);

    if (!user) {
      throw new CustomError(
        `User with email: ${email} not found`,
        HttpStatus.NOT_FOUND
      );
    } else {
      const token = Utils.generateResetPasswordToken();
      const expiresAt: Date = new Date(Date.now() + AuthService.EXPIRES_AT);
      const resetLink: string = `${BASE_URL}/reset-password/${token}`;
      const resetPassword: ResetPasswordDTO = { token, expires: expiresAt };
      user.resetPassword = resetPassword;
      await AuthDal.saveUser(user);
      await mailService.sendMail(
        email,
        "Reset Password Link",
        ResetPasswordTemplate(Utils.extractUsernameFromEmail(email), resetLink)
      );
      AuthService.schedulePasswordResetDeletion(resetPassword);
      return { message: "Reset email sent successfully" };
    }
  }

  static async schedulePasswordResetDeletion(resetPassword: ResetPasswordDTO) {
    const jobName = `delete-reset-token-${resetPassword.token}`;

    if (this.schedulerRegistry.has(jobName)) {
      const existingJob = this.schedulerRegistry.get(jobName);
      if (existingJob) existingJob.stop();
      this.schedulerRegistry.delete(jobName);
    }

    const job = new CronJob(
      new Date(Date.now() + this.EXPIRES_AT),
      async () => {
        try {
          const user = await AuthDal.findUserByResetPasswordToken(
            resetPassword.token
          );

          if (user) {
            user.resetPassword.token = "";
            user.resetPassword.expires = new Date(0);

            await AuthDal.saveUser(user);

            console.log("Expired reset token deleted for user:", user.email);
          } else {
            console.log("No user found with the provided reset token.");
          }
        } catch (error) {
          console.error("Error deleting expired reset token:", error);
        }
      }
    );

    this.schedulerRegistry.set(jobName, job);
    job.start();
  }

  static async resetPassword(resetPasswordDto: ResetPasswordRequestBody) {
    const { token, newPassword, confirmNewPassword } = resetPasswordDto;

    const now: Date = new Date();
    const user = await AuthDal.findUserByResetPasswordTokenAndExpiresDate(
      token,
      now
    );
    if (!user) {
      throw new CustomError("Invalid or expired reset token.", 400);
    }

    user.password = await Utils.hashPassword(newPassword);
    user.resetPassword.token = "";
    user.resetPassword.expires = new Date(0);
    await AuthDal.saveUser(user);

    if (this.schedulerRegistry.has(user.resetPassword.token)) {
      const job: CronJob<null, null> | undefined = this.schedulerRegistry.get(
        user.resetPassword.token
      );
      job?.stop();
      this.schedulerRegistry.delete(
        `delete-reset-token-${user.resetPassword.token}`
      );
      this.schedulerRegistry.delete(user.resetPassword.token);
    }

    return { message: "Reset password successfully" };
  }
}

export default AuthService;
