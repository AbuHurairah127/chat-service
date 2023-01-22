import { blockRouter } from "./routes/block.js";
import * as dotenv from "dotenv";
import connectToMongoDB from "./config/db.js";
import express, { Express } from "express";
import cors from "cors";
import { router } from "./routes/users.js";
import { conversationRouter } from "./routes/conversation.js";
import { messagesRouter } from "./routes/message.js";
import { searchRouter } from "./routes/search.js";
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
app.use("/search", searchRouter);
app.use("/block", blockRouter);
// Checking if the server is successfully started or not
app.listen(_port, () => {
  console.log(`Server started working on port is working on ${_port}`);
});
