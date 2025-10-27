// const constantMessages = require("../utils/constMessages");
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(error.status || 500).send({
    success: false,
    error: {
      message: error?.message || "Internal server Error",
    },
  });
};
