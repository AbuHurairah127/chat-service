import express from "express";
import { body } from "express-validator";
import { getAllMessagesOfASingleConversation, nMessage, } from "../controllers/message.js";
let messagesRouter = express.Router();
messagesRouter.post("/new-message/:walletAddress", [
    body("conversationId", "Enter a conversation ID.").isLength({ min: 24 }),
    body("senderId", "Enter a sender ID.").isLength({ min: 24 }),
    body("text", "Enter some text for recipient.").isLength({ min: 1 }),
], nMessage);
messagesRouter.get("/get-messages/:userId/:conversationId", getAllMessagesOfASingleConversation);
export { messagesRouter };
