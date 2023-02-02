import User from "../models/users.js";
import mongoose from "mongoose";
export const blockUser = async (req, res) => {
    try {
        const blockedUsers = await User.updateOne(
        // User Wallet Address who want to block = req.query.walletAddress
        {
            walletAddress: req.params.walletAddress,
            blockedFriends: { $nin: [req.body.friendAddressToBlock] },
        }, 
        // Wallet Address of the friend user want to block = req.body.friendAddressToBlock
        {
            $push: {
                blockedFriends: req.body.friendAddressToBlock,
                blockedConversations: {
                    conversationId: new mongoose.Types.ObjectId(req.body.conversationId),
                    blockTime: new Date(),
                    unblockTime: null,
                },
            },
        }
        // $cond: {
        //   if: { blockedFriends: { $nin: [req.body.friendAddressToBlock] } },
        //   then: { $push: { blockedFriends: req.body.friendAddressToBlock } },
        //   else: { $push: { blockedFriends: req.body.friendAddressToBlock } },
        // },
        );
        res.status(200).send(blockedUsers);
    }
    catch (error) {
        res.status(503).send("Some Error Occurred");
    }
};
export const unblockFriend = async (req, res) => {
    try {
        const blockedUsers = await User.updateOne(
        // User Wallet Address who want to unblock = req.query.walletAddress
        { walletAddress: req.params.walletAddress }, 
        // Wallet Address of the friend user want to block = req.body.friendAddressToBlock
        {
            $pull: { blockedFriends: req.body.friendAddressToUnblock },
            // $set: { "blockedConversations.$.unblockTime":{
            //   $cond:[]
            // } },
        });
        res.status(200).send(blockedUsers);
    }
    catch (error) {
        res.status(503).send("Some Error Occurred");
    }
};
export const getAllBlockedFriends = async (req, res) => {
    try {
        const blockListOfUser = await User.aggregate([
            { $match: { walletAddress: req.params.walletAddress } },
            {
                $lookup: {
                    from: "users",
                    localField: "blockedFriends",
                    foreignField: "walletAddress",
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
