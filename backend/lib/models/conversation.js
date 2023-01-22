import mongoose from "mongoose";
const { Schema } = mongoose;
const conversationSchema = new Schema({
    members: {
        type: [String],
        required: true,
    },
}, { timestamps: true });
const conversation = mongoose.model("conversation", conversationSchema);
export default conversation;
