const express = require('express');
const {
	followUserController,
	unfollowUserController,
	acceptFollowRequestController,
	rejectFollowRequestController,
	pendingFollowRequestsController
} = require('../controller/user.controller');
const identifyUser = require('../middleware/auth.middleware');

const userRoute = express.Router();

userRoute.post('/follow/:username', identifyUser, followUserController);
userRoute.post('/unfollow/:username', identifyUser, unfollowUserController);
userRoute.post('/follow/accept/:username', identifyUser, acceptFollowRequestController);
userRoute.post('/follow/reject/:username', identifyUser, rejectFollowRequestController);
userRoute.get('/follow/requests/pending', identifyUser, pendingFollowRequestsController);



module.exports = userRoute;