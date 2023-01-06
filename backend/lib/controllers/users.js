import User from "../models/users.js";
import { validationResult, } from "express-validator";
// import { IGetUserAuthInfoRequest } from "../utils/auth.js";
import { ethers } from "ethers";
export const register = async (req, res) => {
    try {
        /* Checking if the request body has any errors. If it does, it will return a 400 status code with the
      errors. */
        const errors = validationResult(req);
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
        const data = {
            user: { id: _user.id },
        };
        res.status(200).json(data);
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
        const { signedMessageHash, walletAddress, message, } = req.body;
        let user = await User.findOne({ walletAddress });
        if (!user) {
            return res.status(400).json({
                error: "Sorry you are not the user of our platform. Please register!",
            });
        }
        const signedMessageHashCompare = await ethers.utils.verifyMessage(message, signedMessageHash);
        if (signedMessageHashCompare !== walletAddress) {
            return false;
        }
        const data = {
            user: {
                id: user.id,
            },
        };
        res.json({});
    }
    catch (error) {
        res.status(500).json("Internal server error");
    }
};
export const userData = async (req, res) => {
    // try {
    //   const userId: string | undefined = req.user;
    //   const user = await User.findById(userId).select("-password");
    //   res.status(200).json({ user });
    // } catch (error) {
    //   res.status(500).json("Internal server error");
    // }
};
