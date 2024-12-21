import AuthDal from "../dal/authDal";
import { IUser, UserRole } from "../models/user.model";
import {
  CookieRequest,
  CustomJWTPayload,
  JWTPayload,
  LoginRequestBody,
  LoginResponseDTO,
  RegisterRequestBody,
  UserResponseDTO,
} from "../types/authTypes";
import Utils from "../utils/utils";
import { CustomError } from "../utils/customError";
import { Response } from "express";
import { HttpStatus } from "../constants/httpStatus";

class AuthService {
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
}

export default AuthService;
