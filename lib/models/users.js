import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
// module.exports = mongoose.model("users", userSchema);
const user = mongoose.model("user", userSchema);
export default user;
