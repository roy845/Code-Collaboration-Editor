import { allowedOrigins } from "../config/allowedOrigins";
import { Request, NextFunction } from "express";

const credentials = (req: Request, res: any, next: NextFunction) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

export default credentials;
