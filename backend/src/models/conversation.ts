import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    members: {
      type: [String],
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    blockedBy: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
  },
  { timestamps: true }
);
const conversation = mongoose.model("conversation", conversationSchema);
export default conversation;
