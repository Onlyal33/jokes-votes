import mongoose from "mongoose";
import dotenv from "dotenv";
import Joke from "../models/joke.ts";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
});

const jokes = [
  {
    question: "Why did the developer go broke?",
    answer: "Because he used up all his cache!",
    votes: [
      { value: 14, label: "😂" },
      { value: 10, label: "👍" },
      { value: 7, label: "❤️" },
    ],
    availableVotes: ["😂", "👍", "❤️"],
  },
  {
    question: "Why did the Energizer Bunny get arrested?",
    answer: "Battery",
    votes: [
      { value: 21, label: "😂" },
      { value: 7, label: "👍" },
      { value: 12, label: "❤️" },
    ],
    availableVotes: ["😂", "👍", "❤️"],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/jokesdb");
    console.log("Connected to MongoDB");

    await Joke.deleteMany({});
    console.log("Cleared existing jokes");

    await Joke.insertMany(jokes);
    console.log("Inserted new jokes");

    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();