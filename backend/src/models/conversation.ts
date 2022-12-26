import mongoose from "mongoose";
const { Schema } = mongoose;

const conversationSchema = new Schema({
  members: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const conversation = mongoose.model("conversation", conversationSchema);
export default conversation;
