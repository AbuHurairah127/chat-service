import express from "express";
import { blockUser } from "../controllers/block.js";
export let blockRouter = express.Router();
blockRouter.post("/block-user/:walletAddress", blockUser);
