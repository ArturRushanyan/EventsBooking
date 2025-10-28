import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { toAppError } from "../types/errors";

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const appError = toAppError(error);
  res.status(appError.status).send({
    success: false,
    error: {
      message: appError.message,
    },
  });
};
