import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { Event } from "./Event";

@Entity({ name: "bookings" })
@Unique("UQ_EVENT_USER", ["event", "user_id"])
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  user_id!: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @ManyToOne(() => Event, (event) => event.bookings, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "event_id" })
  event!: Event;
}
