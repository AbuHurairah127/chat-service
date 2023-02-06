import { Request, Response } from "express";
import User from "../models/users.js";
import mongoose from "mongoose";
export const blockUser = async (req: Request, res: Response) => {
  try {
    const blockedConversations = await User.updateOne(
      // User Wallet Address who want to block = req.query.walletAddress
      {
        walletAddress: req.params.walletAddress,
        blockedFriends: {
          $nin: [new mongoose.Types.ObjectId(req.body.conversationIdToBlock)],
        },
      },
      // ConversationId of the friend user want to block = req.body.friendAddressToBlock

      {
        $push: {
          blockedFriends: new mongoose.Types.ObjectId(
            req.body.conversationIdToBlock
          ),
        },
      }
      // $cond: {
      //   if: { blockedFriends: { $nin: [req.body.friendAddressToBlock] } },
      //   then: { $push: { blockedFriends: req.body.friendAddressToBlock } },
      //   else: { $push: { blockedFriends: req.body.friendAddressToBlock } },
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
        blockedFriends: {
          $in: [new mongoose.Types.ObjectId(req.body.friendAddressToBlock)],
        },
      },

      // Wallet Address of the friend user want to block = req.body.friendAddressToBlock
      {
        $pull: {
          blockedFriends: new mongoose.Types.ObjectId(
            req.body.friendAddressToUnblock
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
      {
        $project: {
          blockedFriendsData: 1,
          _id: -1,
        },
      },
    ]);

    res.status(200).json(blockListOfUser);
  } catch (error) {
    res.status(503).send("Some Error Occurred");
  }
};
