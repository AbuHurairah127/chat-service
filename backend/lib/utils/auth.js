// import { NextFunction, Request, Response } from "express";
// const JWT_SECRET_KEY: string | undefined = process.env.SECRET_KEY;
// export interface IGetUserAuthInfoRequest extends Request {
//   user?: string; // or any other type
// }
// export const authUser = (
//   req: IGetUserAuthInfoRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let data: JwtPayload | string;
//     const token: string | undefined = req.header("token");
//     if (!token) {
//       res.status(401).send("Access Denied");
//     } else {
//       if (typeof JWT_SECRET_KEY === "string") {
//         data = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
//         req.user = data.user.id;
//       }
//     }
//     next();
//   } catch (error) {
//     res.status(401).send("Access Denied");
//   }
// };
export const authUser = () => { };
