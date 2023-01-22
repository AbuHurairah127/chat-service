import Conversation from "../models/conversation.js";
import { validationResult } from "express-validator";
export const newConversation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const savedConversation = await Conversation.create({
            members: [req.body.senderID, req.body.receiverID],
        });
        res.status(200).json(savedConversation);
    }
    catch (error) {
        res.status(500).json("Some error occurred");
        console.log(error);
    }
};
/**
 * It gets all the conversations of a user, skipping the first 15 and limiting the next 15.
 * @param {Request} req - Request,
 * @param {Response} res - Response
 */
export const getAllConversationsOfAUser = async (req, res) => {
    try {
        let conversations = await Conversation.aggregate([
            // Finding the user's conversations using $match
            {
                $match: {
                    members: { $in: [req.params.walletAddress] },
                },
            },
            // Joining the result with the users collection and getting result in the form of array named as "membersData"
            {
                $lookup: {
                    from: "users",
                    let: {
                        indicator_id: "$members",
                        ddd: "0xE813d775f33a97BDA25D71240525C724423D4Cd0",
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: {
                                        $in: ["$walletAddress", "$$indicator_id"],
                                        // $not: {
                                        //   $eq: ["0xE813d775f33a97BDA25D71240525C724423D4Cd0"],
                                        // }
                                    },
                                },
                            },
                        },
                        {
                            $project: {
                                name: "$name",
                                imageUrl: "$imageUrl",
                                walletAddress: "$walletAddress",
                            },
                        },
                    ],
                    as: "conversationWith",
                },
            },
            // Now looking for last message
            {
                $lookup: {
                    from: "messages",
                    let: { indicator_id: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$conversationID", "$$indicator_id"] },
                            },
                        },
                        { $sort: { _id: -1 } },
                        { $limit: 1 },
                    ],
                    as: "message",
                },
            },
            // Sorting result
            {
                $sort: { "message.createdAt": -1 },
            },
            // Skipping and limiting response
            // {
            //   $skip: Number(req.query.skip),
            // },
            // {
            //   $limit: Number(req.query.limit),
            // },
        ]);
        res.status(200).json(conversations);
        // res.status(200).json("Hello World");
        // conversations = conversations.map((conversation) => {
        //   conversation.membersData = conversation.membersData.filter(
        //     (member: Member) => {
        //       return member.walletAddress !== req.params.walletAddress;
        //     }
        //   );
        //   return conversation;
        // });
    }
    catch (error) {
        res.status(500).json("Some Error Occurred");
    }
};
