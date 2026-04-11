const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');

async function followUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    // Implementation for following a user

    if (followerUsername === followeeUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        });
    }
    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    });
    const isFolloweeExist = await userModel.findOne({ 
        name: followeeUsername
    });
    if (!isFolloweeExist) {
        return res.status(404).json({
            message: "User to follow not found"
        });
    }
    if (isAlreadyFollowing) {
        if (isAlreadyFollowing.status === "pending") {
            return res.status(400).json({
                message: `Follow request already sent to ${followeeUsername}`
            });
        }

        if (isAlreadyFollowing.status === "accepted") {
            return res.status(400).json({
                message: `You are already following ${followeeUsername}`
            });
        }

        isAlreadyFollowing.status = "pending";
        await isAlreadyFollowing.save();

        return res.status(200).json({
            message: `Follow request re-sent to ${followeeUsername}`,
            followRecord: isAlreadyFollowing
        });
    }
    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    })
    res.status(200).json({
        message: `Follow request sent to ${followeeUsername}`,
        followRecord
    })
}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(!isUserFollowing){
        return res.status(400).json({
            message: `You are not following ${followeeUsername}`
        })

    }
    await followModel.findByIdAndDelete(isUserFollowing._id);
    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}

async function acceptFollowRequestController(req, res) {
    const followeeUsername = req.user.username;
    const followerUsername = req.params.username;

    const followRequest = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    });

    if (!followRequest) {
        return res.status(404).json({
            message: `No follow request from ${followerUsername}`
        });
    }

    if (followRequest.status === "accepted") {
        return res.status(400).json({
            message: `${followerUsername} is already following you`
        });
    }

    followRequest.status = "accepted";
    await followRequest.save();

    return res.status(200).json({
        message: `Follow request from ${followerUsername} accepted`,
        followRecord: followRequest
    });
}

async function rejectFollowRequestController(req, res) {
    const followeeUsername = req.user.username;
    const followerUsername = req.params.username;

    const followRequest = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    });

    if (!followRequest) {
        return res.status(404).json({
            message: `No follow request from ${followerUsername}`
        });
    }

    if (followRequest.status === "rejected") {
        return res.status(400).json({
            message: `Follow request from ${followerUsername} is already rejected`
        });
    }

    followRequest.status = "rejected";
    await followRequest.save();

    return res.status(200).json({
        message: `Follow request from ${followerUsername} rejected`,
        followRecord: followRequest
    });
}

async function pendingFollowRequestsController(req, res) {
    const followeeUsername = req.user.username;

    const requests = await followModel.find({
        followee: followeeUsername,
        status: "pending"
    });

    return res.status(200).json({
        message: "Pending follow requests fetched",
        requests
    });
}


module.exports = {
  followUserController,
    unfollowUserController,
    acceptFollowRequestController,
    rejectFollowRequestController,
    pendingFollowRequestsController
};
    
