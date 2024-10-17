import { Schema, Document, ObjectId, Types } from "mongoose";
import formatDate from "../utils/formatDate.js";

interface IReaction extends Document {
  reactionId: ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Date;
}

const ReactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate as any,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

export default ReactionSchema;
