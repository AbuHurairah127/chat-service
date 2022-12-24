import Conversation from "../models/conversation.js";
import { Result, ValidationError, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import conversation from "../models/conversation.js";
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
export const newConversation = async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const savedConversation = await Conversation.create({
      members: [req.body.senderID, req.body.receiverID],
    });
    console.log(
      "🚀 ~ file: conversation.ts:12 ~ newConversation ~ savedConversation",
      savedConversation
    );
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json("Some error occurred");
  }
};

export const getAllConversationsOfAUser = async (
  req: Request,
  res: Response
) => {
  try {
    const conversations = await conversation.find({
      members: { $in: [req.params.userID] },
    });
    console.log(req.params.userID);

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json("Some Error Occurred");
  }
};
