import "reflect-metadata";
import { AppDataSource } from "../config/database";

async function run() {
  try {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
    console.log("Migrations executed successfully");
    await AppDataSource.destroy();
    process.exit(0);
  } catch (err) {
    console.error("Failed to run migrations:", err);
    process.exit(1);
  }
}

run();
