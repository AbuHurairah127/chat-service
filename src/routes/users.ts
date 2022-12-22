import express, { Router } from "express";
import { body } from "express-validator";
import { register } from "../controllers/users.js";
let router = express.Router();
router.post("/register", register);
export { router };
