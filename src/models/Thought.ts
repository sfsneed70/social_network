import { Schema, model, Document, ObjectId } from "mongoose";
import Reaction from "./Reaction.js";

interface IThought extends Document {
  thoughtText: String;
  createdAt: Date;
  username: string;
  reactions: ObjectId[];
}

const ThoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal: any) => createdAtVal.toLocaleString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model<IThought>("Thought", ThoughtSchema);

export default Thought;
