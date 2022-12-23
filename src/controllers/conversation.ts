import Conversation from "../models/conversation.js";
import { Result, ValidationError, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const newConversation = async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const savedConversation = await Conversation.create({
      members: {
        senderID: req.body.senderID,
        receiverID: req.body.receiverID,
      },
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
