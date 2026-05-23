import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { MongoMemoryServer } from "mongodb-memory-server";
import { ZodError } from "zod";
import { config } from "./config";
import authRoutes from "./routes/auth";
import companyRoutes from "./routes/companies";
import locationRoutes from "./routes/locations";
import reviewRoutes from "./routes/reviews";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/locations", locationRoutes);

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (error instanceof ZodError) {
    return res.status(400).json({ message: "Please check the submitted fields.", issues: error.issues });
  }

  console.error(error);
  return res.status(500).json({ message: "Something went wrong. Please try again." });
});

const startApi = () => {
  app.listen(config.port, () => {
    console.log(`API running on http://localhost:${config.port}`);
  });
};

mongoose
  .connect(config.mongoUri)
  .then(startApi)
  .catch(async (error) => {
    if (process.env.MONGO_URI) {
      console.error("MongoDB connection failed", error);
      process.exit(1);
    }

    console.warn("Local MongoDB was unavailable. Starting an in-memory MongoDB for development.");
    const memoryServer = await MongoMemoryServer.create({ instance: { launchTimeout: 60000 } });
    await mongoose.connect(memoryServer.getUri());
    app.listen(config.port, () => {
      console.log(`API running on http://localhost:${config.port}`);
    });
  });
