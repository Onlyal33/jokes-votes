export async function getJoke() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joke`);
  if (!response.ok) {
    throw new Error("Failed to fetch joke");
  }

  const body = await response.json();

  return {
    ...body,
    votes: [
      { value: 20, label: "😂" },
      { value: 25, label: "👍" },
      { value: 23, label: "❤️" },
    ],
    availableVotes: ["😂", "👍", "❤️"],
  };
}

export async function postVotes(id: string, vote: string) {
  const response = await fetch(`/api/joke/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ vote }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit vote");
  }

  return response.json();
}
