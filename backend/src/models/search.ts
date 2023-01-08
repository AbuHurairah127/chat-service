import mongoose from "mongoose";
const { Schema } = mongoose;

const searchSchema = new Schema({
  userName: { type: String },
  walletAddress: { type: String },
});
const user = mongoose.model("user", searchSchema);
export default user;
