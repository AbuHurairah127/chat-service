import User from "../models/users.js";
import {
  body,
  Result,
  ValidationError,
  validationResult,
} from "express-validator";
import { Request, Response } from "express";
// import { IGetUserAuthInfoRequest } from "../utils/auth.js";
import { ethers } from "ethers";

type userID = {
  user: {
    id: string;
  };
};

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
    let user = await User.findOne({ walletAddress });
    if (!user) {
      return res.status(400).json({
        error: "Sorry you are not the user of our platform. Please register!",
      });
    }
    const signedMessageHashCompare = await ethers.utils.verifyMessage(
      message,
      signedMessageHash
    );
    if (signedMessageHashCompare !== walletAddress) {
      return false;
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    res.json({});
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};
export const userData = async (req: any, res: Response) => {
  // try {
  //   const userId: string | undefined = req.user;
  //   const user = await User.findById(userId).select("-password");
  //   res.status(200).json({ user });
  // } catch (error) {
  //   res.status(500).json("Internal server error");
  // }
};
