 const postModel = require('../models/post.model');
 const ImageKit = require("@imagekit/nodejs");
 const likeModel = require('../models/like.model');

 const imagekit = new ImageKit({
    
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
    
 })
 
 
 async function createPost (req, res) {
     try {
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const file = await imagekit.files.upload({
            file: req.file.buffer.toString("base64"),
            fileName: req.file.originalname || "upload.jpg",
            folder: "posts"
        });

        const userId = req.userId;
        const post = await postModel.create({
            caption:req.body.caption,
            imageUrl:file.url,
            userId:userId
        });

        res.status(201).json({
            message:"Post Created",
            post
        })
   } catch (error) {
        return res.status(400).json({ message: error.message });
   }
}

async function gatePostController(req, res) {
    try {
        const posts = await postModel.find({
            userId: req.userId
        });

        return res.status(200).json({ posts });
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}

async function getDetailsPostController(req, res) {
 
  try {
    const userId = req.userId;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    const isValidateUser = String(post.userId) === String(userId);

    if (!isValidateUser) {
      return res.status(403).json({
        message: "Forbidden content"
      });
    }

    return res.status(200).json({
      message: "Post fetched successfully",
      post
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}


async function likePostController(req, res) {
  const userId = req.userId;
  const postId = req.params.postId;
  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  };
  const isAlreadyLiked = await likeModel.findOne({
    post: postId,
    user: String(userId)
  });
  if (isAlreadyLiked) {
    return res.status(400).json({
      message: "You have already liked this post"
    });
  }
  const like = await likeModel.create({
    post: postId,
    user: String(userId)
  });

  res.status(200).json({
    message: "Post liked successfully",
    like
  });

}


module.exports = {
    createPost,gatePostController,getDetailsPostController,likePostController

}