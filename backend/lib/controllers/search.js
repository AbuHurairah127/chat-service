import User from "./../models/users.js";
export const findUser = async (req, res) => {
    try {
        const searchingUserBlockList = await User.findOne({
            walletAddress: req.params.walletAddress,
        }, { blockedFriends: 1 });
        /* Searching for a user by username or wallet address. */
        let foundUsers = await User.find({
            $or: [
                {
                    username: {
                        $regex: req.params.key,
                    },
                },
                {
                    walletAddress: {
                        $regex: req.params.key,
                    },
                },
            ],
        });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
