import { Router } from "express";
import { reserveSeat } from "../controllers/booking.controller";
import { validateBooking } from "../middleware/validateBooking";

const router = Router();

router.post("/reserve", validateBooking, reserveSeat);

export default router;
