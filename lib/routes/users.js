import express from "express";
import { body } from "express-validator";
import { login, register } from "../controllers/users.js";
import { authUser } from "../utils/auth.js";
let router = express.Router();
/* A router.post method that is used to validate the user input and then call the REGISTER controller function. */
router.post("/register", 
//   Validation Applied
[
    body("email", "Please enter a valid email address.").isEmail(),
    body("password", "Password is incorrect.").isLength({ min: 5 }),
    body("userName", "Please enter the username.").isLength({ min: 3 }),
    body("lastName", "Please enter your last name.").isLength({ min: 3 }),
    body("firstName", "please enter your first name.").isLength({ min: 3 }),
    body("phoneNumber", "Please enter your phone number.").isLength({
        min: 11,
    }),
    body("walletAddress", "Please enter your wallet address.").isLength({
        min: 26,
    }),
], 
//   Calling Controller Function
register);
// Getting user logged in with email, password and Waller Address
router.post("/login", [
    body("password", "Password is incorrect").isLength({ min: 5 }),
    body("email", "Please enter a valid email address.").isEmail(),
    body("walletAddress", "Please enter a valid wallet address.").isLength({
        min: 26,
    }),
    login,
]);
// Getting user data after sending the authToken
router.get("/user-data", authUser);
export { router };
