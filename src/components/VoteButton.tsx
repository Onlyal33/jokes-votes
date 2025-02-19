import { VoteStatus } from "../utils/voteUtils";
import { useJokeContext } from "@/contexts/JokeContext";

export default function VoteButton({ vote }: { vote: VoteStatus }) {
  const { voteForJoke } = useJokeContext();

  const handleVote = async () => {
    if (!vote.isAvailable) return;
    voteForJoke(vote.label);
  };

  return vote.isAvailable ? (
    <button
      onClick={handleVote}
      className="text-2xl rounded-xl transition-all duration-200 hover:bg-gray-100 cursor-pointer"
    >
      <span className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-sm bg-gray-100">
        <span>{vote.label}</span>
        <span className="font-medium">{vote.value}</span>
      </span>
    </button>
  ) : (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-sm bg-gray-500">
      <span>{vote.label}</span>
      <span className="font-medium">{vote.value}</span>
    </span>
  );
}
