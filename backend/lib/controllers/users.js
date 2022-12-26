import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import { validationResult } from "express-validator";
let JWT_SECRET_KEY;
if (typeof process.env.SECRET_KEY === "string") {
    JWT_SECRET_KEY = process.env.SECRET_KEY;
}
export const register = async (req, res) => {
    try {
        /* Checking if the request body has any errors. If it does, it will return a 400 status code with the
      errors. */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        /* Checking if the wallet address already exists in the database. If it does, it will return a
           400 status code with the message "Sorry a user with this wallet address already exists." */
        let isAddress = await User.findOne({
            walletAddress: req.body.walletAddress,
        });
        if (isAddress) {
            return res
                .status(400)
                .send("Sorry a user with this wallet address already exists.");
        }
        /* This is checking if the email address already exists in the database. If it does, it will return a
        400 status code with the message "Sorry a user with this email address already exists." */
        let isEmail = await User.findOne({
            email: req.body.email,
        });
        if (isEmail) {
            return res
                .status(400)
                .send("Sorry a user with this email address already exists.");
        }
        /* This is checking if the username already exists in the database. If it does, it will return a
         400 status code with the message "Sorry a user with this username already exists." */
        let isUserName = await User.findOne({
            userName: req.body.userName,
        });
        if (isUserName) {
            return res
                .status(400)
                .send("Sorry a user with this username already exists.");
        }
        const salt = await bcrypt.genSaltSync(10);
        let secPass = await bcrypt.hash(req.body.password, salt);
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: secPass,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            walletAddress: req.body.walletAddress,
        });
        const data = {
            user: { id: newUser.id },
        };
        const authToken = jwt.sign(data, JWT_SECRET_KEY);
        res.json({ authToken });
    }
    catch (error) {
        res.status(500).json("Some error occurred");
    }
};
export const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password, walletAddress } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: "Sorry you are not the user of our platform. Please register!",
            });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Password is incorrect." });
        }
        if (walletAddress !== user.walletAddress) {
            return res.status(400).json({ error: "Wallet Address is incorrect." });
        }
        const data = {
            user: {
                id: user.id,
            },
        };
        const authToken = jwt.sign(data, JWT_SECRET_KEY);
        res.json({
            authToken: authToken,
        });
    }
    catch (error) {
        res.status(500).json("Internal server error");
    }
};
export const userData = async (req, res) => {
    try {
        const userId = req.user;
        const user = await User.findById(userId).select("-password");
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json("Internal server error");
    }
};