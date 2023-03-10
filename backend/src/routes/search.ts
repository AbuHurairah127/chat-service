import express, { Router } from "express";
import { findUser } from "../controllers/search.js";
// import { authUser } from "../utils/auth.js";
let searchRouter: Router = express.Router();
searchRouter.get("/user/:walletAddress/:key", findUser);
export { searchRouter };
