"use client";
import VoteButton from "./VoteButton";
import { VoteStatus } from "../utils/voteUtils";
import { useJokeContext } from "@/contexts/JokeContext";

export interface JokeInterface {
  id: string;
  question: string;
  answer: string;
  voteStatuses: VoteStatus[];
}

export interface JokeDTO {
  id: string;
  question: string;
  answer: string;
  votes: { value: number; label: string }[];
  availableVotes: string[];
}

export default function Joke() {
  const { currentJoke } = useJokeContext();
  return (
    currentJoke && (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="space-y-2 mb-4">
        <p className="text-lg font-medium">Q: {currentJoke.question}</p>
        <p className="text-gray-600">A: {currentJoke.answer}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {currentJoke.voteStatuses.map((status) => (
          <VoteButton
            key={status.label}
            vote={status}
          />
        ))}
      </div>
    </div>
  ));
}
