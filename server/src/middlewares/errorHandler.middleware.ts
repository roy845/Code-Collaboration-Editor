import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";

export const errorHandler = (
  err: any, // Use `any` to catch both Mongoose and CustomError
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || [];

  // 🛑 Handle Mongoose Validation Error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((error: any) => ({
      path: error.path,
      message: error.message,
    }));
  }

  // 🛑 Handle MongoDB Duplicate Key Error (E11000)
  if (err.code === 11000) {
    statusCode = 409; // Conflict
    const fieldName = Object.keys(err.keyValue)[0];
    message = `Duplicate value for field: ${fieldName}`;
    errors = [
      { path: fieldName, message: `This ${fieldName} is already taken` },
    ];
  }

  // 🛑 Handle CastError (Invalid ObjectId, etc.)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for field: ${err.path}`;
    errors = [{ path: err.path, message: `Invalid value: ${err.value}` }];
  }

  // 🛑 Handle CustomError
  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
