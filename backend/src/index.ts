import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import jokeRoutes from "./routes/jokes.ts";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use("/api", jokeRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/jokes")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server running on port ${port}, env: ${process.env.NODE_ENV}`);
});

export default app;
