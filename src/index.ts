import * as dotenv from "dotenv";
dotenv.config();
const port: string | undefined = process.env.PORT;
console.log(port);
