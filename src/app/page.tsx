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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1 flex items-center gap-6">
        Best Jokes
      </header>
      <main className="flex flex-col gap-8 items-center">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          currentJoke && <Joke />
        )}
        <NextButton />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Best Jokes Company © 2025
      </footer>
    </div>
  );
}
