import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    secretRecoveryPhrase: { type: "string", required: true },
    signedMessageHash: { type: "string", required: true },
  },
  { timestamps: true }
);
const user = mongoose.model("user", userSchema);
export default user;
