import mongoose, { Mongoose } from "mongoose";
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    members: {
      type: [String],
    },
  },
  { timestamps: true }
);
const conversation = mongoose.model("conversation", conversationSchema);
export default conversation;
