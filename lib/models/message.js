import mongoose from "mongoose";
const { Schema } = mongoose;
const messageSchema = new Schema({
    senderID: {
        type: String,
    },
    conversationID: { type: String },
    text: { type: String },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
// module.exports = mongoose.model("messages", messageSchema);
const message = mongoose.model("message", messageSchema);
export default message;
