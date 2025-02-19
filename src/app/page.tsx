"use client";
import { useEffect } from "react";
import Joke from "../components/Joke";
import NextButton from "../components/NextButton";
import { useJokeContext } from "@/contexts/JokeContext";

export default function Home() {
  const { currentJoke, isLoading, error, fetchJoke } = useJokeContext();

  useEffect(() => {
    fetchJoke();
  }, [fetchJoke]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 sm:p-20">
      <header>
        <h1>Best Jokes</h1>
      </header>
      <main className="flex-1 flex flex-col gap-8 items-center justify-center">
        {isLoading ? <div>Loading...</div> : currentJoke && <Joke />}
        <NextButton />
      </main>
      <footer>Best Jokes Company © 2025</footer>
    </div>
  );
}
