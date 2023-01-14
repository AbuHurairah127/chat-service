import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
    signedMessageHash: { type: "string", required: true },
    walletAddress: { type: "string", required: true },
    username: { type: "string", required: true },
    imageURL: { type: "string", required: true },
}, { timestamps: true });
const user = mongoose.model("user", userSchema);
export default user;
