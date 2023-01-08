import Conversation from "../models/conversation.js";
import { validationResult } from "express-validator";
/**
 * It creates a new conversation between two users.
 * @param {Request} req - Request, res: Response
 * @param {Response} res - Response
 * @returns The conversation object is being returned.
 */
// interface SingleConversation {
//   createdAt: Date;
//   members?: {
//     senderID?: string | undefined;
//     receiverID?: string | undefined;
//   };
// }
export const newConversation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const savedConversation = await Conversation.create({
            members: [req.body.senderID, req.body.receiverID],
        });
        res.status(200).json(savedConversation);
    }
    catch (error) {
        res.status(500).json("Some error occurred");
    }
};
/**
 * It gets all the conversations of a user, skipping the first 15 and limiting the next 15.
 * @param {Request} req - Request,
 * @param {Response} res - Response
 */
export const getAllConversationsOfAUser = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.params.userID] },
        })
            .sort({ updatedAt: -1 })
            .skip(Number(req.params.startCount))
            .limit(Number(req.params.startCount + 15));
        res.status(200).json(conversations);
    }
    catch (error) {
        res.status(500).json("Some Error Occurred");
    }
};
