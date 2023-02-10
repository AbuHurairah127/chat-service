import express, { Router } from "express";
import { body, param } from "express-validator";
import {
  getAllMessagesOfASingleConversation,
  nMessage,
} from "../controllers/message.js";
import { authUser } from "../utils/auth.js";
let messagesRouter: Router = express.Router();
messagesRouter.post(
  "/new-message/:walletAddress",
  [
    body("conversationId", "Enter a conversation ID.").isLength({ min: 24 }),
    body("senderId", "Enter a sender ID.").isLength({ min: 24 }),
    body("text", "Enter some text for recipient.").isLength({ min: 1 }),
  ],
  nMessage
);
messagesRouter.get(
  "/get-messages/:userId/:conversationId",
  getAllMessagesOfASingleConversation
);
export { messagesRouter };
