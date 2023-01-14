import User from "./../models/users.js";
export const findUser = async (req, res) => {
    try {
        /* Searching for a user by username or wallet address. */
        const foundUsers = await User.find({
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
        res.status(200).json(foundUsers);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
