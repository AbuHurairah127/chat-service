import * as dotenv from "dotenv";
import port1 from "./config/db.js";
console.log("🚀 ~ file: index.ts:3 ~ port1", port1);
dotenv.config();
const port = process.env.PORT;
console.log(port);
