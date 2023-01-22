import express, { Router } from "express";
import { blockUser, unblockFriend } from "../controllers/block.js";
export let blockRouter: Router = express.Router();

blockRouter.put("/block-user/:walletAddress", blockUser);
blockRouter.put("/unblock-user/:walletAddress", unblockFriend);
