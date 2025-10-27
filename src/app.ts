import express, { Application } from "express";
import config from "./config/config";

class App {
  public app: Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = config.PORT;
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Booking System API running on port ${this.port} `);
    });
  }
}

export default App;
