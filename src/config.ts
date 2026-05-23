import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT ?? 5000),
  mongoUri: process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/company_review_app",
  jwtSecret: process.env.JWT_SECRET ?? "company-review-secret",
  clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5174",
  jwtExpiresIn: "6h"
};
