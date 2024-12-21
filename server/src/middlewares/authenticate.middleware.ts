import { Request, Response, NextFunction } from "express";
import Utils from "../utils/utils";
import { CustomJWTPayload } from "../types/authTypes";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        username: string;
        roles: string[];
      };
    }
  }
}

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided." });
    return;
  }

  try {
    const decoded: CustomJWTPayload = Utils.verfiyToken(token!);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
      roles: decoded.roles,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized: Invalid token." });
    return;
  }
};

export default authenticate;
