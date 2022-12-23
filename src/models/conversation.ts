import mongoose from "mongoose";
const { Schema } = mongoose;

const conversationSchema = new Schema({
  members: {
    type: {
      senderID: String,
      receiverID: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const conversation = mongoose.model("conversation", conversationSchema);
export default conversation;
