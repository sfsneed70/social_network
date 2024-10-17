import { Schema, model, Document, ObjectId } from "mongoose";
import Reaction from "./Reaction.js";
import formatDate from "../utils/formatDate.js";

interface IThought extends Document {
  thoughtText: String;
  createdAt: Date;
  username: string;
  // userId: ObjectId;
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
      get: formatDate as any,
    },
    username: {
      type: String,
      required: true,
    },
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
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
