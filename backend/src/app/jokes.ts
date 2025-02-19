import Joke from '../models/joke.ts';

export async function getRandomJoke() {
  const count = await Joke.countDocuments();
  const random = Math.floor(Math.random() * count);
  return Joke.findOne().skip(random);
}

export async function updateJokeVotes(jokeId: string, voteLabel: string) {
  return Joke.findOneAndUpdate(
    { _id: jokeId, 'votes.label': voteLabel },
    { $inc: { 'votes.$.value': 1 } },
    { new: true }
  );
}
