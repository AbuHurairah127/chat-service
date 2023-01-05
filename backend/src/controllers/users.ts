import User from "../models/users.js";
import { Result, ValidationError, validationResult } from "express-validator";
import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../utils/auth.js";
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
  } catch (error) {
    res.status(500).json("Some error occurred");
  }
};
export const login = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};
export const userData = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const userId: string | undefined = req.user;
    const user = await User.findById(userId).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};
