import Conversation from "../models/conversation.js";
import { validationResult } from "express-validator";
export const newConversation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const savedConversation = await Conversation.create({
            members: {
                senderID: req.body.senderID,
                receiverID: req.body.receiverID,
            },
        });
        console.log("🚀 ~ file: conversation.ts:12 ~ newConversation ~ savedConversation", savedConversation);
        res.status(200).json(savedConversation);
    }
    catch (error) {
        res.status(500).json("Some error occurred");
    }
};
