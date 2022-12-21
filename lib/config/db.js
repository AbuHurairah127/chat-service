import * as dotenv from "dotenv";
dotenv.config();
const port1 = process.env.PORT;
export default port1;
// const connectToMongoDB = () => {
//   mongoose.connect(port, () => {
//     console.log("MongoDB is working Properly");
//   });
// };
// export default connectToMongoDB;
