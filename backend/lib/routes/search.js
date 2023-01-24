import express from "express";
import { findUser } from "../controllers/search.js";
// import { authUser } from "../utils/auth.js";
let searchRouter = express.Router();
searchRouter.get("/user/:walletAddress/:key", findUser);
export { searchRouter };
