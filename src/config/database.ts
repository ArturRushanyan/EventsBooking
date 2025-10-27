import { DataSource } from "typeorm";
import config from "./config";
import { Event } from "../entities/Event";
import { Booking } from "../entities/Booking";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.DATABASE.HOST,
  port: config.DATABASE.PORT,
  username: config.DATABASE.USERNAME,
  password: config.DATABASE.PASSWORD,
  database: config.DATABASE.DATABASE,
  entities: [Event, Booking],
  synchronize: false,
  logging: false,
});
