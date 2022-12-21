import mongoose from "mongoose";
require("dotenv").config("./../../.env");
const port1: string | undefined = process.env.PORT;
console.log("🚀 ~ file: db.ts:4 ~ port", port1);
export default port1;

// const connectToMongoDB = () => {
//   mongoose.connect(port, () => {
//     console.log("MongoDB is working Properly");
//   });
// };

// export default connectToMongoDB;
