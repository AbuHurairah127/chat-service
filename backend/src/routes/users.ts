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
    body("walletAddress", "Please enter your wallet address.").isLength({
      min: 26,
    }),
  ],
  //   Calling Controller Function
  register
);
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
router.get("/user-data", authUser, userData);

export { router };
