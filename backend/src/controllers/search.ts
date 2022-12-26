import User from "./../models/users.js";
import { Request, Response } from "express";
interface SearchedUser {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  walletAddress: string;
  createdAt: Date;
}
export const findUser = async (req: Request, res: Response) => {
  try {
    if (req.body.userName) {
      const user: SearchedUser | null = await User.findOne({
        userName: req.body.userName,
      }).select("-password");
      return res.status(200).json(user);
    } else if (req.body.walletAddress) {
      const user: SearchedUser | null = await User.findOne({
        walletAddress: req.body.walletAddress,
      }).select("-password");
      return res.status(200).json(user);
    } else {
      return res
        .status(400)
        .json("Please send a valid wallet address or a valid user name.");
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
