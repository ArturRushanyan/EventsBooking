import { Response, NextFunction } from "express";
import { BookingRequestBody } from "../types/requests";
import { AppError } from "../types/errors";
import { TypedRequestBody } from "../types/http";
import { ErrorMessages } from "../utils/constantMessages";

export const validateBooking = (
  req: TypedRequestBody<BookingRequestBody>,
  res: Response,
  next: NextFunction
): void => {
  const { event_id, user_id } = req.body;

  if (!event_id || !user_id) {
    throw {
      status: 400,
      message: ErrorMessages.eventIdAndUserIdRequired,
    } as AppError;
  }

  if (isNaN(Number(event_id))) {
    throw {
      status: 400,
      message: ErrorMessages.eventIdMustBeNumber,
    } as AppError;
  }

  if (typeof user_id !== "string" || user_id.trim().length === 0) {
    throw {
      status: 400,
      message: ErrorMessages.userIdMustBeString,
    } as AppError;
  }

  req.body.event_id = Number(event_id);
  req.body.user_id = user_id.trim();

  next();
};
