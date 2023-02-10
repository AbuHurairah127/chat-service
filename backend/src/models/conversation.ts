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
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);
const conversation = mongoose.model("conversation", conversationSchema);
export default conversation;
