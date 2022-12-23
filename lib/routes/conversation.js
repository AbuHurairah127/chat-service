import express from "express";
import { body } from "express-validator";
import { newConversation } from "../controllers/conversation.js";
import { authUser } from "../utils/auth.js";
let conversationRouter = express.Router();
conversationRouter.post("/new-conversation", [
    body("senderID", "Enter a valid sender ID").isLength({ min: 1 }),
    body("receiverID", "Enter a valid receiverID").isLength({ min: 1 }),
], authUser, newConversation);
export { conversationRouter };
