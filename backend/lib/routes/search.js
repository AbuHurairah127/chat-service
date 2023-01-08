import express from "express";
import { findUser } from "../controllers/search.js";
let searchRouter = express.Router();
searchRouter.get("/user/:key", findUser);
export { searchRouter };
