import User from "../models/users.js";
import { Result, ValidationError, validationResult } from "express-validator";
import { Request, Response } from "express";
import { ethers } from "ethers";
import { IGetUserAuthInfoRequest } from "../utils/auth.js";
import { ObjectId } from "mongoose";

type userID = {
  user: {
    id: string;
  };
};

/**
 * It creates a new user in the database
 * @param {Request} req - Request - The request object.
 * @param {Response} res - Response - The response object that will be sent back to the client.
 * @returns The user id is being returned.
 */
export const register = async (req: Request, res: Response) => {
  try {
    /* Checking if the request body has any errors. If it does, it will return a 400 status code with the
  errors. */
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /* Creating a new user in the database. */
    const _user = await User.create({
      username: req.body.username,
      walletAddress: req.body.walletAddress,
      signedMessageHash: req.body.signedMessageHash,
      secretRecoveryPhrase: req.body.secretRecoveryPhrase,
    });

    const data: userID = {
      user: { id: _user.id },
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("Some error occurred");
  }
};
/**
 * It takes in a signed message hash, wallet address, and message from the user, and then compares the
 * signed message hash to the wallet address. If they match, it returns the user's id
 * @param {Request} req - Request, res: Response
 * @param {Response} res - Response
 * @returns The user id is being returned.
 */
export const login = async (req: Request, res: Response) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      signedMessageHash,
      walletAddress,
      message,
    }: { signedMessageHash: string; walletAddress: string; message: string } =
      req.body;
    let user: {
      signedMessageHash: string;
      walletAddress: string;
      secretRecoveryPhrase: string;
      username: string;
      createdAt: Date;
      updatedAt: Date;
      _id: string;
    } | null = await User.findOne({ walletAddress });
    if (!user) {
      return res.status(400).json({
        error: "Sorry you are not the user of our platform. Please register!",
      });
    }
    const signedMessageHashCompare: string = await ethers.utils.verifyMessage(
      message,
      signedMessageHash
    );

    if (signedMessageHashCompare !== walletAddress) {
      return false;
    }
    const data: userID = {
      user: {
        id: user._id,
      },
    };
    res.json({ data });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};
/**
 * It takes a request object, and a response object, and returns a user object
 * @param {IGetUserAuthInfoRequest} req - IGetUserAuthInfoRequest
 * @param {Response} res - Response
 */
export const userData = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const userId: ObjectId | undefined = req.user;
    const user = await User.findById(userId).select("-secretRecoveryPhrase");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};
/**
 * It takes a wallet address and a secret recovery phrase, finds the user with that wallet address, and
 * if the secret recovery phrase matches the one in the database, it updates the secret recovery phrase
 * in the database
 * @param {Request} req - Request -&gt; The request object
 * @param {Response} res - Response -&gt; This is the response object that is returned to the client.
 */
export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const {
      walletAddress,
      secretRecoveryPhrase,
      updatedSignedMessageHash,
    }: {
      walletAddress: string;
      secretRecoveryPhrase: string;
      updatedSignedMessageHash: string;
    } = req.body;
    const user: {
      signedMessageHash: string;
      walletAddress: string;
      secretRecoveryPhrase: string;
      username: string;
      createdAt: Date;
      updatedAt: Date;
      _id: string;
    } | null = await User.findOne({ walletAddress });
    if (
      user?.secretRecoveryPhrase.toLowerCase() ===
      secretRecoveryPhrase.toLowerCase()
    ) {
      const updatedUser = await User.updateOne(
        { walletAddress },
        { $set: { signedMessageHash: updatedSignedMessageHash } }
      );
      res.status(200).send("Password Updated Successfully.");
      console.log(updatedUser);
    }
  } catch (error) {
    res.status(501).send("Some Error Occurred.");
  }
};
