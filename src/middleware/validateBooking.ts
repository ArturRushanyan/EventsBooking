import { Request, Response, NextFunction } from "express";

export const validateBooking = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { event_id, user_id } = req.body;

  if (!event_id || !user_id) {
    throw { status: 400, message: "event_id and user_id are required" };
  }

  if (isNaN(Number(event_id))) {
    throw { status: 400, message: "event_id must be a number" };
  }

  if (typeof user_id !== "string" || user_id.trim().length === 0) {
    throw { status: 400, message: "user_id must be a non-empty string" };
  }

  req.body.event_id = Number(event_id);
  req.body.user_id = user_id.trim();

  next();
};
