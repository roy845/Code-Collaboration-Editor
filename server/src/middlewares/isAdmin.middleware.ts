import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/user.model";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req?.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized: No user ID provided." });
      return;
    }

    if (!req?.user?.roles.includes(UserRole.ADMIN)) {
      res.status(403).json({ error: "Access denied: Admins only." });
      return;
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
    return;
  }
};

export default isAdmin;
