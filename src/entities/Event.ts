import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Booking } from "./Booking";

@Entity({ name: "events" })
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "int" })
  total_seats!: number;

  // One event can have many bookings
  @OneToMany(() => Booking, (booking) => booking.event)
  bookings!: Booking[];
}
