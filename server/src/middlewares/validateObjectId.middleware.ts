import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export interface ValidateObjectIdRequest extends Request {
  params: {
    objectId?: string;
  };
}

const validateObjectId = (
  req: ValidateObjectIdRequest,
  res: Response,
  next: NextFunction
): void => {
  const { objectId } = req.params;
  console.log(objectId);

  if (!mongoose.Types.ObjectId.isValid(objectId!)) {
    res.status(400).json({ error: `Invalid ObjectId: ${objectId}` });
    return;
  }

  next();
};

export default validateObjectId;
