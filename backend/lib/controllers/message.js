import Message from "../models/message.js";
import { validationResult } from "express-validator";
export const nMessage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const sentMessage = await Message.create(req.body);
        res.status(200).json(sentMessage);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
export const getAllMessagesOfASingleConversation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const messages = await Message.find({
            conversationID: req.params.conversationID,
        });
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
