import express, { Router } from "express";
import { body } from "express-validator";
import { nMessage } from "../controllers/message.js";
import { authUser } from "../utils/auth.js";
let messagesRouter: Router = express.Router();
messagesRouter.post(
  "/new-message",
  [
    body("conversationID", "Enter a conversation ID.").isLength({ min: 5 }),
    body("senderID", "Enter a sender ID.").isLength({ min: 5 }),
    body("text", "Enter some text for recipient.").isLength({ min: 1 }),
  ],
  authUser,
  nMessage
);
export { messagesRouter };
