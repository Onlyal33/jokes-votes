import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import jokeRoutes from "./routes/jokes.ts";

dotenv.config({
  path: process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development'
});

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api", jokeRoutes);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/jokes")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server running on port ${port}, env: ${process.env.NODE_ENV}`);
});
