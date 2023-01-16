import Message from "../models/message.js";
import { validationResult } from "express-validator";
import conversation from "../models/conversation.js";
export const nMessage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const data = req.body;
    try {
        const sentMessage = await Message.create(data);
        await conversation.updateOne({
            _id: req.body.conversationID,
        }, {
            $set: {
                updatedAt: new Date(),
                lastMessage: sentMessage._id,
            },
        });
        res.status(200).json(sentMessage);
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
    try {
        const messages = await Message.find({
            conversationID: req.params.conversationID,
        })
            .sort({
            updatedAt: -1,
        })
            .skip(Number(req.params.messageLimit))
            .limit(Number(req.params.messageLimit) + 65);
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
