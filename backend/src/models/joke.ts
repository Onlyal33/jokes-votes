import mongoose, { Schema, Document } from "mongoose";

export interface IJoke extends Document {
  id: string;
  question: string;
  answer: string;
  votes: {
    label: string;
    value: number;
  }[];
  availableVotes: string[];
}

const jokeSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    votes: [
      {
        label: { type: String, required: true },
        value: { type: Number, default: 0 },
      },
    ],
    availableVotes: [{ type: String }],
  },
  {
    collection: "jokes",
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

export default mongoose.model<IJoke>("Joke", jokeSchema);
