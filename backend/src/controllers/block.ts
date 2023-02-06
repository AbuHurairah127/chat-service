import { Request, Response } from "express";
import User from "../models/users.js";
import mongoose from "mongoose";
import conversation from "../models/conversation.js";
export const blockUser = async (req: Request, res: Response) => {
  try {
    const blockedConversations = await User.updateOne(
      // User Wallet Address who want to block = req.query.walletAddress
      {
        walletAddress: req.params.walletAddress,
        blockedConversations: {
          $nin: [new mongoose.Types.ObjectId(req.body.conversationIdToBlock)],
        },
      },
      // ConversationId of the friend user want to block = req.body.friendAddressToBlock

      {
        $push: {
          blockedConversations: new mongoose.Types.ObjectId(
            req.body.conversationIdToBlock
          ),
        },
      }
      // $cond: {
      //   if: { blockedConversations: { $nin: [req.body.friendAddressToBlock] } },
      //   then: { $push: { blockedConversations: req.body.friendAddressToBlock } },
      //   else: { $push: { blockedConversations: req.body.friendAddressToBlock } },
      // },
    );
    res.status(200).send(blockedConversations);
  } catch (error) {
    res.status(503).send("Some Error Occurred");
  }
};
export const unblockFriend = async (req: Request, res: Response) => {
  try {
    const unblockedConversation = await User.updateOne(
      // User Wallet Address who want to unblock = req.query.walletAddress
      {
        walletAddress: req.params.walletAddress,
        blockedConversations: {
          $in: [new mongoose.Types.ObjectId(req.body.conversationIdToUnblock)],
        },
      },

      // Wallet Address of the friend user want to block = req.body.friendAddressToBlock
      {
        $pull: {
          blockedConversations: new mongoose.Types.ObjectId(
            req.body.conversationIdToUnblock
          ),
        },
      }
    );
    res.status(200).send(unblockedConversation);
  } catch (error) {
    res.status(503).send("Some Error Occurred");
  }
};

export const getAllBlockedFriends = async (req: Request, res: Response) => {
  try {
    console.log("blockListOfUser");
    const blockListOfUser = await User.aggregate([
      { $match: { walletAddress: req.params.walletAddress } },
      {
        $lookup: {
          from: "conversations",
          localField: "blockedConversations",
          foreignField: "_id",
          as: "blockedFriendsData",
        },
      },
      { $unwind: "$blockedFriendsData" },
      {
        $lookup: {
          from: "users",
          let: { indicator_id: "$blockedFriendsData.members" },
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

    console.log("blockListOfUser");

    res.status(200).json(blockListOfUser);
  } catch (error) {
    res.status(503).send("Some Error Occurred");
  }
};
