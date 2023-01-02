import jwt from "jsonwebtoken";
const JWT_SECRET_KEY = process.env.SECRET_KEY;
export const authUser = (req, res, next) => {
    try {
        let data;
        const token = req.header("token");
        if (!token) {
            res.status(401).send("Access Denied");
        }
        else {
            if (typeof JWT_SECRET_KEY === "string") {
                data = jwt.verify(token, JWT_SECRET_KEY);
                req.user = data.user.id;
            }
        }
        next();
    }
    catch (error) {
        res.status(401).send("Access Denied");
    }
};
