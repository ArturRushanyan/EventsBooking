import express, { Application } from "express";
import config from "./config/config";
import { AppDataSource } from "./config/database";

class App {
  public app: Application;
  public port: number;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.port = config.PORT;
  }

  public async initializeDatabase(): Promise<void> {
    try {
      await AppDataSource.initialize();
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Error connecting to database:", error);
      throw error;
    }
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Booking System API running on port ${this.port} `);
    });
  }
}

export default App;
