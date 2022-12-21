import express, { Router } from "express";
import { body } from "express-validator";
let router = express.Router();
router.get("/", async (req, res) => {
  res.json("Working with routes");
});
export { router };
