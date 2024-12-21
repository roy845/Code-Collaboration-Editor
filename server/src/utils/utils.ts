import bcrypt from "bcrypt";
import { CustomJWTPayload, JWTPayload } from "../types/authTypes";
import jwt from "jsonwebtoken";

class Utils {
  static SALT_ROUNDS = 10;
  static hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, Utils.SALT_ROUNDS);
  };
  static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateTokens(payload: JWTPayload): [string, string] {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET!,
      { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN }
    );

    return [accessToken, refreshToken];
  }

  static generateAccessToken(payload: JWTPayload): string {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return accessToken;
  }

  static verfiyJWTToken(jwtToken: string): CustomJWTPayload {
    return jwt.verify(
      jwtToken,
      process.env.JWT_REFRESH_TOKEN_SECRET!
    ) as CustomJWTPayload;
  }

  static verfiyToken(jwtToken: string): CustomJWTPayload {
    return jwt.verify(jwtToken, process.env.JWT_SECRET!) as CustomJWTPayload;
  }
}

export default Utils;
