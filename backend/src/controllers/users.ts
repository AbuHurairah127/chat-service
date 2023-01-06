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
let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

// type Aliases for different objects.
type ReqTesting = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  userName: string;
  phoneNumber: string;
};

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
    /* Checking if the wallet address already exists in the database. If it does, it will return a
       400 status code with the message "Sorry a user with this wallet address already exists." */

    const newUser = await User.create({
      userName: req.body.userName,
      walletAddress: req.body.walletAddress,
      signedMessageHash: req.body.signedMessageHash,
      secretRecoveryPhrase: req.body.secretRecoveryPhrase,
    });
    console.log("user creating");

    const data: userID = {
      user: { id: newUser.id },
    };
    res.status(200).json(req.body.signedMessageHash);
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
    const { signedMessageHash, walletAddress, message } = req.body;
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
    console.log(signedMessageHashCompare);
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
