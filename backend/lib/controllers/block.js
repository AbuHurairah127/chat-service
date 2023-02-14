import mongoose from "mongoose";
import Conversation from "../models/conversation.js";
export const blockUser = async (req, res) => {
    try {
        const blockedConversations = await Conversation.updateOne(
        // ConversationId of the friend user want to block = req.body.conversationIdToBlock
        {
            _id: req.body.conversationIdToBlock,
            isBlocked: false,
        }, 
        // User Wallet Address who want to block = req.query.walletAddress
        {
            $set: {
                isBlocked: true,
                blockedBy: new mongoose.Types.ObjectId(req.body.userId),
            },
        });
        res.status(200).send(blockedConversations);
    }
    catch (error) {
        res.status(503).send("Some Error Occurred");
    }
};
export const unblockFriend = async (req, res) => {
    try {
        const unblockedConversation = await Conversation.updateOne(
        // User Wallet Address who want to unblock = req.query.walletAddress
        {
            _id: req.body.conversationIdToUnblock,
            isBlocked: true,
            blockedBy: req.params.walletAddress,
        }, 
        // Wallet Address of the friend user want to block = req.body.friendAddressToBlock
        {
            $set: {
                isBlocked: false,
                blockedBy: null,
            },
        });
        res.status(200).send(unblockedConversation);
    }
    catch (error) {
        res.status(503).send("Some Error Occurred");
    }
};
export const getAllBlockedFriends = async (req, res) => {
    try {
        const blockListOfUser = await Conversation.aggregate([
            { $match: { blockedBy: new mongoose.Types.ObjectId(req.params.userId) } },
            {
                $lookup: {
                    from: "users",
                    let: { indicator_id: "$members" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $in: ["$walletAddress", "$$indicator_id"] },
                                        { $ne: ["$walletAddress", req.params.walletAddress] },
                                    ],
                                },
                            },
                        },
                        {
                            $project: {
                                name: "$username",
                                imageUrl: "$imageUrl",
                                walletAddress: "$walletAddress",
                            },
                        },
                    ],
                    as: "blockedFriendsData",
                },
            },
            {
                $project: {
                    blockedFriendsData: 1,
                    _id: -1,
                },
            },
        ]);
        res.status(200).json(blockListOfUser);
    }
    catch (error) {
        res.status(503).send("Some Error Occurred");
    }
};
