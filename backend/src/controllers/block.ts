import { Request, Response } from "express";
import User from "../models/users.js";
export const blockUser = async (req: Request, res: Response) => {
  try {
    const blockedUsers = await User.updateOne(
      // User Wallet Address who want to block = req.query.walletAddress
      { walletAddress: req.params.walletAddress },
      // Wallet Address of the friend user want to block = req.body.friendAddressToBlock
      { $push: { blockedFriends: req.body.friendAddressToBlock } }
    );
    res.status(200).send(blockedUsers);
  } catch (error) {
    res.status(503).send("Some Error Occurred");
  }
};
export const unblockFriend = async (req: Request, res: Response) => {
  try {
    const blockedUsers = await User.updateOne(
      // User Wallet Address who want to unblock = req.query.walletAddress
      { walletAddress: req.params.walletAddress },
      // Wallet Address of the friend user want to block = req.body.friendAddressToBlock
      { $pull: { blockedFriends: req.body.friendAddressToUnblock } }
    );
    res.status(200).send(blockedUsers);
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
    // const blockListOfUser = await User.findOne({
    //   walletAddress: req.params.walletAddress,
    // });
    res.status(200).json(blockListOfUser);
  } catch (error) {
    res.status(503).send("Some Error Occurred");
  }
};
