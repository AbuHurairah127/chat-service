import express from "express";
import { body } from "express-validator";
import { forgetPassword, login, register, userData, } from "../controllers/users.js";
import { authUser } from "../utils/auth.js";
let router = express.Router();
/* A router.post method that is used to validate the user input and then call the REGISTER controller function. */
router.post("/register", 
//   Validation Applied
[
    body("username", "Please enter the username.").isLength({ min: 3 }),
    body("imageURL", "please enter your imageURl.").isLength({
        min: 3,
    }),
    body("signedMessageHash", "Please enter your signature.").isLength({
        min: 11,
    }),
    body("walletAddress", "Please enter your wallet address.").isLength({
        min: 26,
    }),
], 
//   Calling Controller Function
register);
/* Calling the login function. */
router.post("/login", [
    body("message", "Password is incorrect").isLength({ min: 4 }),
    body("walletAddress", "Please enter a valid wallet address.").isLength({
        min: 26,
    }),
    body("signedMessageHash", "Please enter a valid signed message hash.").isLength({
        min: 26,
    }),
    login,
]);
/* A router.get method that is used to get the user data. */
router.get("/user-data", authUser, userData);
/* Calling the forgetPassword function. */
router.post("/forget-password", [
    body("walletAddress", "Please enter your wallet address.").isLength({
        min: 26,
    }),
    body("secretRecoverPhrase", "Please enter a secret password recovery phrase.").isLength({ min: 10 }),
    body("updatedSignedMessageHash", "PLease enter the updates signed message hash").isLength({
        min: 26,
    }),
], forgetPassword);
export { router };
