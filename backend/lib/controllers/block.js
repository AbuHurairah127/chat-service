import User from "../models/users.js";
export const blockUser = async (req, res) => {
    try {
        const blockedUsers = await User.updateOne({ walletAddress: req.params.walletAddress }, { $push: { blockedFriends: req.body.friendIdToBlock } });
        res.status(200).send(blockedUsers);
    }
    catch (error) {
        res.status(503).send("Some Error Occurred");
    }
};
export const unblockFriend = async (req, res) => {
    try {
        const blockedUsers = await User.updateOne({ walletAddress: req.params.walletAddress }, { $pull: { blockedFriends: req.body.friendIdToBlock } });
        res.status(200).send(blockedUsers);
    }
    catch (error) {
        res.status(503).send("Some Error Occurred");
    }
};
