import express, { Router } from "express";
import { body } from "express-validator";
import { login, register, userData } from "../controllers/users.js";
import { authUser } from "../utils/auth.js";
let router: Router = express.Router();

/* A router.post method that is used to validate the user input and then call the REGISTER controller function. */
router.post(
  "/register",
  //   Validation Applied
  [
    body("username", "Please enter the username.").isLength({ min: 3 }),
    body("secretRecoveryPhrase", "please enter your first name.").isLength({
      min: 3,
    }),
    body("signedMessageHash", "Please enter your phone number.").isLength({
      min: 11,
    }),
    body("walletAddress", "Please enter your wallet address.").isLength({
      min: 26,
    }),
  ],
  //   Calling Controller Function
  register
);
/* Calling the login function. */
router.post("/login", [
  body("message", "Password is incorrect").isLength({ min: 4 }),
  body("walletAddress", "Please enter a valid wallet address.").isLength({
    min: 26,
  }),
  login,
]);
/* A router.get method that is used to get the user data. */
router.get("/user-data", authUser, userData);

export { router };
