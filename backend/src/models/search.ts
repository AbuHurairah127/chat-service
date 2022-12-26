import mongoose from "mongoose";
const { Schema } = mongoose;

const searchSchema = new Schema({
  userName: { type: String },
  walletAddress: { type: String },
});
// module.exports = mongoose.model("users", userSchema);
const user = mongoose.model("user", searchSchema);
export default user;
