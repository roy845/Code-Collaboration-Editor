import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../models/user.model";
import { Request } from "express";

export interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface ResetPasswordDTO {
  token: string;
  expires: Date;
}

export type UserResponse = {
  _id: string;
  username: string;
  email: string;
  roles: UserRole[];
  resetPassword: ResetPasswordDTO;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface UserResponseDTO {
  user: UserResponse;
  message: string;
}

export type JWTPayload = {
  id: number;
  username: string;
  email: string;
  roles: UserRole[];
};

export interface CookieRequest extends Request {
  cookies: {
    jwt?: string;
  };
}

export interface CustomJWTPayload extends JwtPayload {
  id: string;
  username: string;
  email: string;
  roles: string[];
}
