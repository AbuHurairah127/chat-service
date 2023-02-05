import Message from "../models/message.js";
import { validationResult } from "express-validator";
import Conversation from "../models/conversation.js";
export const nMessage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const data = req.body;
    try {
        const conversations = Conversation.findById(data.conversationID, (err, data) => {
            if (err) {
                return err;
            }
            else {
                return data;
            }
        });
        // const sentMessage = await Message.create(data);
        // console.log(
        //   "🚀 ~ file: message.ts:45 ~ nMessage ~ sentMessage",
        //   sentMessage
        // );
        res.status(200).json(conversations);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
/**
 * It gets all the messages of a single conversation.
 * @param {Request} req - Request,
 * @param {Response} res - Response
 * @returns An array of messages.
 */
export const getAllMessagesOfASingleConversation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // const conversationId = req.params.conversationId;
    // const walletAddress = req.params.walletAddress;
    try {
        const messages = await Message.find({
            conversationID: req.params.conversationId,
        }).sort({
            createdAt: -1,
        });
        console.log(messages);
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
