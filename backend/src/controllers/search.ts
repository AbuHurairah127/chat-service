import User from "./../models/users.js";
import { Request, Response } from "express";
interface SearchedUser {
  username: string;
  signedMessageHash: string;
  walletAddress: string;
  createdAt: Date;
  updatedAt: Date;
}
export const findUser = async (req: Request, res: Response) => {
  try {
    /* Searching for a user by username or wallet address. */
    const foundUsers: SearchedUser[] | [] = await User.find({
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
    });
    res.status(200).json(foundUsers);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
