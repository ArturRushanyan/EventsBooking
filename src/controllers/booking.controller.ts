import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/database";
import { Event } from "../entities/Event";
import { Booking } from "../entities/Booking";

export const reserveSeat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      return res.status(404).json({ error: "Event not found" });
    }

    //Check available seats
    const bookingsCount = await bookingRepository.count({
      where: { event: event_id },
    });

    if (bookingsCount >= event.total_seats) {
      return res
        .status(409)
        .json({ error: "No available seats for this event" });
    }

    const booking = new Booking();
    booking.event = event;
    booking.user_id = user_id;

    await bookingRepository.save(booking);

    const remainingSeats = event.total_seats - bookingsCount - 1;

    return res.status(201).json({
      success: true,
      message: `Booking successful. ${remainingSeats} seats remaining.`,
    });
  } catch (error: any) {
    // NOTE: here is especially hardcoded type 'any' to be able to catch any error
    if (error.code === "23505" && error.constraint === "UQ_EVENT_USER") {
      next({ status: 400, message: "User already booked this event" });
    }
    next(error);
  }
};
