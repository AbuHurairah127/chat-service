import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
  senderID: {
    type: mongoose.Types.ObjectId,
  },
  conversationID: { type: mongoose.Types.ObjectId },
  text: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const message = mongoose.model("message", messageSchema);
export default message;
