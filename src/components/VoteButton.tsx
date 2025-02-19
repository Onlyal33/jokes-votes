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
      className={`text-2xl rounded-xl transition-all duration-200 ${
        isVoted
          ? "bg-gray-200 cursor-not-allowed"
          : "hover:bg-gray-100 cursor-pointer"
      }`}
    >
      <span className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-sm bg-gray-100">
        {vote.label}
        <span className="font-medium">{vote.value}</span>
      </span>
    </button>
  );
}
