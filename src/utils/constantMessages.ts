export const ErrorMessages = {
  eventIdAndUserIdRequired: "event_id and user_id are required",
  eventIdMustBeNumber: "event_id must be a number",
  userIdMustBeString: "user_id must be a non-empty string",
  InternalServerError: "Internal server Error",
};

export const Messages = {
  eventNotFound: "Event not found",
  NoAvailableSeats: "No available seats for this event",
  successBooking: (remainingSeats: number) =>
    `Booking successful. ${remainingSeats} seats remaining.`,
  alreadyBookedThisEvent: "User already booked this event",
};
