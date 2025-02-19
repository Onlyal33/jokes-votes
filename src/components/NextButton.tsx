"use client";

import { useJokeContext } from "@/contexts/JokeContext";

export default function NextButton() {
  const { fetchJoke } = useJokeContext();

  return (
    <button
      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-indigo-700 text-background gap-2 hover:bg-indigo-800 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      onClick={fetchJoke}
    >
      Next Joke
    </button>
  );
}
