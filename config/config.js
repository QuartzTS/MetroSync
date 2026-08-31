import { configDotenv } from "dotenv";

configDotenv({ path: "./.env.example" });


export const SERVER_PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || "production";
export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGO_URI = process.env.MONGO_URI;
