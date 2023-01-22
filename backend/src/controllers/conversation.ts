import Conversation from "../models/conversation.js";
import { Result, ValidationError, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import mongoose, { Mongoose } from "mongoose";
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
type LastMessage = {
  _id: mongoose.Types.ObjectId;
  senderID: mongoose.Types.ObjectId;
  conversationID: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
  __v: number;
};
type Member = {
  _id: mongoose.Types.ObjectId;
  walletAddress: string;
  username: string;
  imageURL: string;
  lastMessage: [LastMessage];
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
      // Finding the user's conversations using $match
      {
        $match: {
          members: { $in: [req.params.walletAddress] },
        },
      },
      // Joining the result with the users collection and getting result in the form of array named as "membersData"
      {
        $lookup: {
          from: "users",
          let: {
            indicator_id: "$members",
            ddd: "0xE813d775f33a97BDA25D71240525C724423D4Cd0",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: {
                    $in: ["$walletAddress", "$$indicator_id"],
                    // $not: {
                    //   $eq: ["0xE813d775f33a97BDA25D71240525C724423D4Cd0"],
                    // }
                  },
                },
              },
            },
            {
              $project: {
                name: "$name",
                imageUrl: "$imageUrl",
                walletAddress: "$walletAddress",
              },
            },
          ],
          as: "conversationWith",
        },
      },
      // Now looking for last message
      {
        $lookup: {
          from: "messages",
          let: { indicator_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$conversationID", "$$indicator_id"] },
              },
            },
            { $sort: { _id: -1 } }, // add sort if needed (for example, if you want first 100 comments by creation date)
            { $limit: 1 },
          ],
          as: "message",
        },
      },
      // Sorting result
      {
        $sort: { "message.createdAt": -1 },
      },
      // Skipping and limiting response
      // {
      //   $skip: Number(req.query.skip),
      // },
      // {
      //   $limit: Number(req.query.limit),
      // },
    ]);

    res.status(200).json(conversations);

    // res.status(200).json("Hello World");

    // conversations = conversations.map((conversation) => {
    //   conversation.membersData = conversation.membersData.filter(
    //     (member: Member) => {
    //       return member.walletAddress !== req.params.walletAddress;
    //     }
    //   );
    //   return conversation;
    // });
  } catch (error) {
    res.status(500).json("Some Error Occurred");
  }
};
