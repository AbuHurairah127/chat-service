import express from "express";
import { blockUser, unblockFriend } from "../controllers/block.js";
export let blockRouter = express.Router();
blockRouter.put("/block-user/:walletAddress", blockUser);
blockRouter.put("/unblock-user/:walletAddress", unblockFriend);
