const express = require('express');
const postRouter = express.Router();
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});
const identifyUser = require("../middleware/auth.middleware.js");

const {createPost, getDetailsPostController,likePostController} = require("../controller/posts.controller.js");
const {gatePostController} = require("../controller/posts.controller.js");

postRouter.post("/create", identifyUser, upload.single("image"), createPost);
postRouter.get("/", identifyUser, gatePostController);
postRouter.get("/details/:postId", identifyUser, getDetailsPostController);
postRouter.post("/like/:postId", identifyUser, likePostController);

module.exports = postRouter;