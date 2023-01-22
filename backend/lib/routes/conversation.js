import express from "express";
import { body } from "express-validator";
import { getAllConversationsOfAUser, newConversation, } from "../controllers/conversation.js";
let conversationRouter = express.Router();
// Route to introduce a new conversation
conversationRouter.post("/new-conversation", [
    body("senderID", "Enter a valid sender ID").isLength({ min: 1 }),
    body("receiverID", "Enter a valid receiverID").isLength({ min: 1 }),
], newConversation);
// Route to GET all the conversation of users
conversationRouter.get("/my-all-conversations/:userId/:startCount", getAllConversationsOfAUser);
export { conversationRouter };
