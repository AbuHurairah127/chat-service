import * as dotenv from "dotenv";
import connectToMongoDB from "./config/db.js";
import express from "express";
import cors from "cors";
dotenv.config();
const _port: string | undefined = process.env.PORT;
let app = express();
connectToMongoDB();
app.use(express.json);
app.use(cors());
// Checking if the server is successfully started or not
app.listen(_port, () => {
  console.log(`Server started working on port ${_port}`);
});
