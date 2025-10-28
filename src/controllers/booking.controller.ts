import { Response, NextFunction } from "express";
import { TypedRequestBody } from "../types/http";
import { AppDataSource } from "../config/database";
import { Event } from "../entities/Event";
import { Booking } from "../entities/Booking";
import { BookingRequestBody } from "../types/requests";
import { AppError } from "../types/errors";

export const reserveSeat = async (
  req: TypedRequestBody<BookingRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { event_id, user_id } = req.body;

    const eventRepository = AppDataSource.getRepository(Event);
    const bookingRepository = AppDataSource.getRepository(Booking);

    // Check if event exists
    const event = await eventRepository.findOne({
      where: { id: event_id },
      relations: ["bookings"],
    });

    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    const bookingsCount: number = event.bookings.length;

    if (bookingsCount >= event.total_seats) {
      res.status(409).json({ error: "No available seats for this event" });
      return;
    }

    const booking = new Booking();
    booking.event = event;
    booking.user_id = user_id;

    await bookingRepository.save(booking);

    const remainingSeats = event.total_seats - bookingsCount - 1;

    res.status(201).json({
      success: true,
      message: `Booking successful. ${remainingSeats} seats remaining.`,
    });
    return;
  } catch (error: unknown) {
    const maybe = error as Partial<AppError>;
    if (
      maybe &&
      maybe.code === "23505" &&
      maybe.constraint === "UQ_EVENT_USER"
    ) {
      return next({ status: 400, message: "User already booked this event" });
    }
    return next(error);
  }
};
