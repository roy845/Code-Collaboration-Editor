import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/user.model";

export type AllowedRoles = UserRole[];

const authorizeRoles = (...allowedRoles: AllowedRoles) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req?.user?.id;
      if (!userId) {
        res.status(401).json({ error: "Unauthorized: No user ID provided." });
        return;
      }

      const userRoles = req?.user?.roles as UserRole[];

      if (
        !userRoles ||
        !userRoles.some((role: UserRole) => allowedRoles.includes(role))
      ) {
        res.status(403).json({
          error: `Access denied: Insufficient permissions. Only ${allowedRoles.join(
            ","
          )} can access`,
        });
        return;
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
      return;
    }
  };
};

export default authorizeRoles;
