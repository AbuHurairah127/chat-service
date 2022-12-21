import * as dotenv from "dotenv";
import connectToMongoDB from "./config/db.js";
import express from "express";
import cors from "cors";
import { router } from "./routes/users.js";
dotenv.config();
const _port = process.env.PORT;
const app = express();
connectToMongoDB();
//  middle wares
app.use(express.json());
app.use(cors());
app.use("/auth", router);
// Checking if the server is successfully started or not
app.listen(_port, () => {
    console.log(`Server started working on port is working on ${_port}`);
});
