import express, { Router } from "express";
import { blockUser } from "../controllers/block.js";
export let blockRouter: Router = express.Router();

blockRouter.post("/block-user/:walletAddress", blockUser);
