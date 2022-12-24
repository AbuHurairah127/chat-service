import * as dotenv from "dotenv";
import connectToMongoDB from "./config/db.js";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { router } from "./routes/users.js";
import { conversationRouter } from "./routes/conversation.js";
import { messagesRouter } from "./routes/message.js";
dotenv.config();
const _port: string | undefined = process.env.PORT;
const app: Express = express();
connectToMongoDB();
//  middle wares
app.use(express.json());
app.use(cors());
app.use("/auth", router);
app.use("/conversation", conversationRouter);
app.use("/message", messagesRouter);
// Checking if the server is successfully started or not
app.listen(_port, () => {
  console.log(`Server started working on port is working on ${_port}`);
});
