"use client";
import { useSession } from "@/contexts/SessionContext";
import { VoteStatus } from "@/utils/voteUtils";
import { useJokeContext } from "@/contexts/JokeContext";

export default function VoteButton({ vote }: { vote: VoteStatus }) {
  const { currentJoke, voteForJoke } = useJokeContext();
  const { hasVoted, addVote } = useSession();

  const handleVote = async () => {
    if (
      !vote.isAvailable ||
      !currentJoke ||
      hasVoted(currentJoke.id, vote.label)
    )
      return;

    try {
      await voteForJoke(vote.label);
      addVote(currentJoke.id, vote.label);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const isVoted = currentJoke ? hasVoted(currentJoke.id, vote.label) : false;

  return (
    <button
      onClick={handleVote}
      disabled={isVoted}
      className={`
        group relative px-4 py-2 rounded-lg transition-all duration-300
        ${isVoted
          ? "bg-indigo-100 text-indigo-700"
          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <span className="font-medium">{vote.label}</span>
        <span className={`
          inline-flex items-center justify-center w-6 h-6 rounded-full
          ${isVoted
            ? "bg-indigo-200 text-indigo-700"
            : "bg-gray-200 text-gray-600"
          }
        `}>
          {vote.value}
        </span>
      </div>
      {isVoted && (
        <span className="absolute inset-0 border-2 border-indigo-400 rounded-lg animate-pulse" />
      )}
    </button>
  );
}