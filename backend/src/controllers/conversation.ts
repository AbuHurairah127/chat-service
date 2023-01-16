import Conversation from "../models/conversation.js";
import { Result, ValidationError, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
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
type Member = {
  _id: mongoose.Types.ObjectId;
  signedMessageHash?: "0x8c99dad66bb0ba3f9b2a1d13f19e95a93c169cc8590cb0cbb4101a799d88691a7834e366c923a308b60abd0193abfbe25db91256dbd302abb67f333e69ebfa031b";
  walletAddress: string;
  username: string;
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
};
export const newConversation = async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const savedConversation = await Conversation.create({
      members: [req.body.senderID, req.body.receiverID],
    });

    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json("Some error occurred");
    console.log(error);
  }
};

/**
 * It gets all the conversations of a user, skipping the first 15 and limiting the next 15.
 * @param {Request} req - Request,
 * @param {Response} res - Response
 */
export const getAllConversationsOfAUser = async (
  req: Request,
  res: Response
) => {
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
        $lookup: {
          from: "messages",
          localField: "lastMessage",
          foreignField: "_id",
          as: "lastMessage",
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
      conversation.membersData = conversation.membersData.filter(
        (member: Member) => {
          return member.walletAddress !== req.params.walletAddress;
        }
      );
      return conversation;
    });

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json("Some Error Occurred");
  }
};
