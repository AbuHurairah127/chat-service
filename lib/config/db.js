"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config("./../../.env");
const port1 = process.env.PORT;
console.log("🚀 ~ file: db.ts:4 ~ port", port1);
exports.default = port1;
// const connectToMongoDB = () => {
//   mongoose.connect(port, () => {
//     console.log("MongoDB is working Properly");
//   });
// };
// export default connectToMongoDB;
