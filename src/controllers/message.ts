import Message from "../models/message.js";
import { Result, ValidationError, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import message from "../models/message.js";

export const nMessage = async (req: Request, res: Response) => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const sentMessage = await Message.create(req.body);
    res.status(200).json(sentMessage);
    console.log(
      "🚀 ~ file: message.ts:13 ~ nMessage ~ sentMessage",
      sentMessage
    );
  } catch (error) {
    res.status(500).json(error);
  }
};
