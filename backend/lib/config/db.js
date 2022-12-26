import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const db = String(process.env.DB);
mongoose.set("strictQuery", false);
// connecting to MongoDB Database
const connectToMongoDB = () => {
    mongoose.connect(db, () => {
        console.log("MongoDB is working Properly");
    });
};
export default connectToMongoDB;
