import User from "./../models/users.js";
import mongoose from "mongoose";
import { Request, Response } from "express";
interface SearchedUser {
  username: string;
  signedMessageHash: string;
  walletAddress: string;
  createdAt: Date;
  updatedAt: Date;
  _id: mongoose.Types.ObjectId;
}
export const findUser = async (req: Request, res: Response) => {
  try {
    const searchingUserBlockList = await User.findOne(
      {
        walletAddress: req.params.walletAddress,
      },
      { blockedFriends: 1 }
    );

    /* Searching for a user by username or wallet address. */
    let foundUsers: SearchedUser[] | [] = await User.find({
      $and: [
        {
          $or: [
            {
              username: {
                $regex: req.params.key,
              },
            },
            {
              walletAddress: {
                $regex: req.params.key,
              },
            },
          ],
        },
        {
          walletAddress: {
            $nin: searchingUserBlockList?.blockedFriends,
            $ne: req.params.walletAddress,
          },
        },
      ],
    });
    console.log(foundUsers);
    res.status(200).json(foundUsers);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
