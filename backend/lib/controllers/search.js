import User from "./../models/users.js";
export const findUser = async (req, res) => {
    try {
        if (req.body.userName) {
            const user = await User.findOne({
                userName: req.body.userName,
            });
            return res.status(200).json(user);
        }
        else if (req.body.walletAddress) {
            const user = await User.findOne({
                walletAddress: req.body.walletAddress,
            });
            return res.status(200).json(user);
        }
        else {
            return res
                .status(400)
                .json("Please send a valid wallet address or a valid user name.");
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
