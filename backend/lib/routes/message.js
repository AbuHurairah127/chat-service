import express from "express";
import { body, param } from "express-validator";
import { getAllMessagesOfASingleConversation, nMessage, } from "../controllers/message.js";
import { authUser } from "../utils/auth.js";
let messagesRouter = express.Router();
messagesRouter.post("/new-message", [
    body("conversationID", "Enter a conversation ID.").isLength({ min: 24 }),
    body("senderID", "Enter a sender ID.").isLength({ min: 24 }),
    body("text", "Enter some text for recipient.").isLength({ min: 1 }),
], authUser, nMessage);
messagesRouter.get("/get-messages/:conversationID/:limit", [
    param("conversationID", "Pass a conversation Id through the params").isLength({ min: 24 }),
], authUser, getAllMessagesOfASingleConversation);
export { messagesRouter };
