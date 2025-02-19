import { Router } from "express";
import { getRandomJoke, updateJokeVotes } from "../app/jokes.ts";

const router = Router();

router.get("/joke", async (_req, res) => {
  try {
    const joke = await getRandomJoke();
    if (!joke) {
      res.status(404).json({ message: "No jokes found" });
      return;
    }
    res.json(joke);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/joke/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { vote } = req.body;

    const updatedJoke = await updateJokeVotes(id, vote);

    if (!updatedJoke) {
      res.status(404).json({ message: "Joke not found" });
      return;
    }

    res.json(updatedJoke);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
