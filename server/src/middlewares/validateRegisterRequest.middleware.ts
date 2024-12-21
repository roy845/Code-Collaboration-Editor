import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import { CustomError } from "../utils/customError";

const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));
        next(new CustomError("Validation failed", 400, errors));
      }
      next(error);
    }
  };
};

export default validateRequest;
