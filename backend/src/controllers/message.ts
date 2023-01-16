import Message from "../models/message.js";
import { Result, ValidationError, validationResult } from "express-validator";
import { Request, Response } from "express";
import conversation from "../models/conversation.js";
import mongoose from "mongoose";

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
  const data: Body = req.body;
  try {
    const sentMessage = await Message.create(data);
    await conversation.updateOne(
      {
        _id: req.body.conversationID,
      },
      {
        $set: {
          updatedAt: new Date(),
          lastMessage: sentMessage._id,
        },
      }
    );
    res.status(200).json(sentMessage);
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
  try {
    const messages = await Message.find({
      conversationID: req.params.conversationID,
    })
      .sort({
        updatedAt: -1,
      })
      .skip(Number(req.params.messageLimit))
      .limit(Number(req.params.messageLimit) + 65);

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};
