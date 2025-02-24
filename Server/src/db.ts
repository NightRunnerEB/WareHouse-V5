import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "warehouse_db",
  password: process.env.DB_PASSWORD || "1234",
  port: Number(process.env.DB_PORT) || 5432,
});
