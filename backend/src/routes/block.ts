import express, { Router } from "express";
import {
  blockUser,
  getAllBlockedFriends,
  unblockFriend,
} from "../controllers/block.js";
export let blockRouter: Router = express.Router();

blockRouter.put("/block-user/:walletAddress", blockUser);
blockRouter.put("/unblock-user/:walletAddress", unblockFriend);
blockRouter.get(
  "/get-all-blocked-friends/:walletAddress",
  getAllBlockedFriends
);
