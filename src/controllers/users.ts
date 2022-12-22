import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
let JWT_SECRET_KEY: string;
import User from "../models/users.js";
import { Result, ValidationError, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
// const user = require("../models/user");
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
export const register = async (req: Request, res: Response) => {
  try {
    /* Checking if the request body has any errors. If it does, it will return a 400 status code with the
  errors. */
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /* This is checking if the email address already exists in the database. If it does, it will return a
    400 status code with the message "Sorry a user with this email address already exists." */
    let isEmail: ReqTesting | null = await User.findOne({
      email: req.body.email,
    });
    if (isEmail) {
      return res
        .status(400)
        .send("Sorry a user with this email address already exists.");
    }
    /* This is checking if the username already exists in the database. If it does, it will return a
     400 status code with the message "Sorry a user with this username already exists." */
    let isUserName: ReqTesting | null = await User.findOne({
      userName: req.body.userName,
    });
    if (isUserName) {
      return res
        .status(400)
        .send("Sorry a user with this username already exists.");
    }
    const salt: string = await bcrypt.genSaltSync(10);
    let secPass: string = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: secPass,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    });
    const data = {
      user: { id: newUser.id },
    };
    const authToken: string = jwt.sign(data, JWT_SECRET_KEY);
    res.json({ authToken });
  } catch (error) {
    res.status(500).json("Some error occurred");
  }
};
