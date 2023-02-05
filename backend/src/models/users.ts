import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    signedMessageHash: { type: String, required: true },
    walletAddress: { type: String, required: true },
    username: { type: String, required: true },
    imageURL: { type: String, required: true },
    blockedFriends: { type: [String], default: [] },
  },
  { timestamps: true }
);
const user = mongoose.model("user", userSchema);
export default user;
