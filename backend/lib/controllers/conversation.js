import Conversation from "../models/conversation.js";
import { validationResult } from "express-validator";
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
        console.log(error);
    }
};
/**
 * It gets all the conversations of a user, skipping the first 15 and limiting the next 15.
 * @param {Request} req - Request,
 * @param {Response} res - Response
 */
export const getAllConversationsOfAUser = async (req, res) => {
    try {
        let conversations = await Conversation.aggregate([
            {
                $match: {
                    members: { $in: [req.params.walletAddress] },
                },
            },
            {
                $lookup: {
                    from: "users",
                    pipeline: [
                        { $match: { walletAddress: req.params.walletAddress } },
                        {
                            $project: {
                                username: "$username",
                                imageURL: "$imageURL",
                                address: "$walletAddress",
                            },
                        },
                    ],
                    as: "membersData",
                },
            },
            {
                $sort: { updatedAt: -1 },
            },
            {
                $skip: Number(req.params.startCount),
            },
            {
                $limit: Number(15),
            },
        ]);
        conversations = conversations.map((conversation) => {
            conversation.membersData = conversation.membersData.filter((member) => {
                return member.walletAddress !== req.params.walletAddress;
            });
            return conversation;
        });
        res.status(200).json(conversations);
    }
    catch (error) {
        res.status(500).json("Some Error Occurred");
    }
};
