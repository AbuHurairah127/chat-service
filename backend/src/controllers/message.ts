import Message from "../models/message.js";
import { Result, ValidationError, validationResult } from "express-validator";
import { Request, Response } from "express";
import Conversation from "../models/conversation.js";
import mongoose from "mongoose";
import User from "../models/users.js";

/**
 * It creates a new message and updates the conversation's updatedAt field.
 * </code>
 * @param {Request} req - Request, res: Response
 * @param {Response} res - Response
 * @returns {
 *   "errors": [
 *     {
 *       "value": "",
 *       "msg": "Invalid value",
 *       "param": "conversationID",
 *       "location": "body"
 *     }
 *   ]
 * }
 * </code>
 */
type Body = {
  conversationID: mongoose.Types.ObjectId;
  senderID: mongoose.Types.ObjectId;
  text: string;
};
export const nMessage = async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const data = req.body;
  try {
    const conversations = Conversation.findOne(
      {
        _id: req.body.conversationId,
        isBlocked: false,
      },
      { _id: 1 },
      async (err: any, response: any) => {
        if (err) {
          return res.status(200).json(err);
        } else if (!response) {
          if (response.blockedBy == req.params.walletAddress) {
            return res.status(200).send("This conversation is blocked by you.");
          } else {
            return res
              .status(200)
              .send("This conversation is blocked by the other person.");
          }
        } else {
          console.log(data);

          const sentMessage = await Message.create(data);
          return res.status(200).json(sentMessage);
        }
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * It gets all the messages of a single conversation.
 * @param {Request} req - Request,
 * @param {Response} res - Response
 * @returns An array of messages.
 */
export const getAllMessagesOfASingleConversation = async (
  req: Request,
  res: Response
) => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // const conversationId = req.params.conversationId;
  // const walletAddress = req.params.walletAddress;

  try {
    const messages = await Message.find({
      conversationID: req.params.conversationId,
    }).sort({
      createdAt: -1,
    });
    console.log(messages);

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};
