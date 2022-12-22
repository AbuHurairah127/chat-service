import * as dotenv from "dotenv";
import connectToMongoDB from "./config/db.js";
import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { router } from "./routes/users.js";
import { authUser } from "./utils/auth.js";
dotenv.config();
const _port: string | undefined = process.env.PORT;
const app: Application = express();
connectToMongoDB();
//  middle wares
app.use(express.json());
app.use(cors());
app.use("/auth", router);
// Checking if the server is successfully started or not
app.listen(_port, () => {
  console.log(`Server started working on port is working on ${_port}`);
});
