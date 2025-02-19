"use client";
import { JokeDTO, JokeInterface } from "@/components/Joke";
import { getJoke, postVotes } from "@/utils/apiHelpers";
import { convertVoteData } from "@/utils/voteUtils";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface JokeContextType {
  currentJoke: JokeInterface | null;
  fetchJoke: () => Promise<void>;
  voteForJoke: (label: string) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

const JokeContext = createContext<JokeContextType | undefined>(undefined);

export function JokeProvider({ children }: { children: ReactNode }) {
  const [currentJoke, setCurrentJoke] = useState<JokeInterface | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchJoke = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data: JokeDTO = await getJoke();
      const newJoke = {
        id: data.id,
        question: data.question,
        answer: data.answer,
        voteStatuses: convertVoteData(data.votes, data.availableVotes),
      };
      setCurrentJoke(newJoke);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch joke"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const voteForJoke = useCallback(
    async (label: string) => {
      setIsLoading(true);
      setError(null);

      if (!currentJoke) return;

      try {
        const updatedJoke: JokeDTO = await postVotes(currentJoke.id, label);
        const voteStatuses = convertVoteData(
          updatedJoke.votes,
          updatedJoke.availableVotes,
        );
        setCurrentJoke({ ...currentJoke, voteStatuses });
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error voting"));
      } finally {
        setIsLoading(false);
      }
    },
    [currentJoke],
  );

  return (
    <JokeContext.Provider
      value={{ currentJoke, isLoading, error, fetchJoke, voteForJoke }}
    >
      {children}
    </JokeContext.Provider>
  );
}

export function useJokeContext() {
  const context = useContext(JokeContext);
  if (context === undefined) {
    throw new Error("useJokeContext must be used within a JokeProvider");
  }
  return context;
}
