const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getJoke() {
  console.log('env', process.env.NODE_ENV);
  const response = await fetch(`${API_URL}/joke`);
  if (!response.ok) {
    throw new Error("Failed to fetch joke");
  }
  return response.json();
}

export async function postVotes(id: string, vote: string) {
  const response = await fetch(`${API_URL}/joke/${id}`, {
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
