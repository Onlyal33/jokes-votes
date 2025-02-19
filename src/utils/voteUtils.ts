export type VoteStatus = {
  value: number;
  label: string;
  isAvailable: boolean;
};

export const convertVoteData = (
  votes: { value: number; label: string }[],
  availableVotes: string[],
): VoteStatus[] => {
  const voteMap = new Map(votes.map((vote) => [vote.label, vote.value]));

  return Array.from(
    new Set([...votes.map((vote) => vote.label), ...availableVotes]),
  ).map((label) => ({
    label,
    value: voteMap.get(label) || 0,
    isAvailable: availableVotes.includes(label),
  }));
};
