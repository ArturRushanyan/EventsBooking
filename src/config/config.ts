import "dotenv/config";

const PORT: number = Number(process.env.PORT) || 3080;

export default {
  PORT,
};
