import * as dotenv from "dotenv";
import connectToMongoDB from "./config/db.js";
import express from "express";
import cors from "cors";
dotenv.config();
const _port = process.env.PORT;
let app = express();
connectToMongoDB();
app.use(express.json);
app.use(cors());
app.listen(_port, () => {
    console.log(`Example app listening on port ${_port}`);
});
