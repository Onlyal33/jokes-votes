"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface Vote {
  jokeId: string;
  label: string;
}

interface SessionContextType {
  votedJokes: Vote[];
  addVote: (jokeId: string, label: string) => void;
  hasVoted: (jokeId: string, label: string) => boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [votedJokes, setVotedJokes] = useState<Vote[]>([]);

  const addVote = (jokeId: string, label: string) => {
    setVotedJokes((prev) => [...prev, { jokeId, label }]);
  };

  const hasVoted = (jokeId: string, label: string) => {
    return votedJokes.some(
      (vote) => vote.jokeId === jokeId && vote.label === label,
    );
  };

  return (
    <SessionContext.Provider value={{ votedJokes, addVote, hasVoted }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
