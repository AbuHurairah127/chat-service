import user from "../models/users.js";
export const authUser = async (req, res, next) => {
    try {
        const { walletAddress } = req.body;
        const signedMessageHash = req.header("signedMessageHash");
        let findUser = await user.findOne({ walletAddress });
        if (findUser === null) {
            res.status(503).json("Access denied");
        }
        if (!signedMessageHash) {
            res.status(503).send("Access Denied");
        }
        else if (signedMessageHash === findUser?.signedMessageHash) {
            req.user = findUser._id;
            console.log("sending Id");
            next();
        }
        else {
            res.status(503).send("Access Denied");
        }
    }
    catch (error) {
        res.status(401).send("Access Denied");
    }
};
