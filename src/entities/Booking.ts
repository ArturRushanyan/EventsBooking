import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Event } from "./Event";

@Entity({ name: "bookings" })
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
