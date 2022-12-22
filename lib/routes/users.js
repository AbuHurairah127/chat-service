import express from "express";
import { register } from "../controllers/users.js";
let router = express.Router();
router.post("/register", register);
export { router };
