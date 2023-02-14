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
        const conversations = Conversation.findOneAndUpdate({
            _id: req.body.conversationId,
            isBlocked: false,
        }, { updatedAt: new Date() }, async (err, response) => {
            if (err) {
                return res.status(200).json(err);
            }
            else if (!response) {
                if (response.blockedBy == req.body.senderID) {
                    return res.status(200).send("This conversation is blocked by you.");
                }
                else {
                    return res
                        .status(200)
                        .send("This conversation is blocked by the other person.");
                }
            }
            else {
                const sentMessage = await Message.create(data);
                return res.status(200).json(sentMessage);
            }
        });
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
