import { NextFunction, Request, Response } from "express";
import user from "../models/users.js";
import { ObjectId } from "mongoose";
export interface IGetUserAuthInfoRequest extends Request {
  user?: ObjectId; // or any other type
}

export const authUser = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { walletAddress }: { walletAddress: string } = req.body;
    const signedMessageHash: string | undefined =
      req.header("signedMessageHash");

    let findUser: {
      signedMessageHash: string;
      walletAddress: string;
      secretRecoveryPhrase?: string;
      username: string;
      createdAt: Date;
      updatedAt: Date;
      _id: ObjectId;
    } | null = await user.findOne({ walletAddress });

    if (findUser === null) {
      res.status(503).json("Access denied");
    }

    if (!signedMessageHash) {
      res.status(503).send("Access Denied");
    } else if (signedMessageHash === findUser?.signedMessageHash) {
      req.user = findUser._id;
      console.log("sending Id");
      next();
    } else {
      res.status(503).send("Access Denied");
    }
  } catch (error) {
    res.status(401).send("Access Denied");
  }
};
