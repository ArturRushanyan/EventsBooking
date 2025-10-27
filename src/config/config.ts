import "dotenv/config";

const PORT: number = Number(process.env.PORT) || 3080;
const DB_PORT: number = Number(process.env.DB_PORT);
const DB_USERNAME: string = process.env.DB_USERNAME || "";
const DB_PASSWORD: string = process.env.DB_PASSWORD || "";
const DB_NAME: string = process.env.DB_NAME || "";
const DB_HOST: string = process.env.DB_HOST || "";

export default {
  PORT,
  DATABASE: {
    HOST: DB_HOST,
    PORT: DB_PORT,
    USERNAME: DB_USERNAME,
    PASSWORD: DB_PASSWORD,
    DATABASE: DB_NAME,
  },
};
