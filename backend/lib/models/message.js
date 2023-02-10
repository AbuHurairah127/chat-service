import mongoose from "mongoose";
const { Schema } = mongoose;
const messageSchema = new Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    conversationId: { type: mongoose.Types.ObjectId, required: true },
    text: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const message = mongoose.model("message", messageSchema);
export default message;
