
const userModel = require('../models/user.model');
const followModel = require('../models/follow.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerUser(req,res){
    const {email,name,password} = req.body;

    const isUserAlreadyExist = await userModel.findOne({email});
    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"User already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        email,name,password:hashedPassword
    })

    const token = jwt.sign({
        id:user._id,
        email:user.email,
        username:user.name
    },process.env.JWT_SECRET);

    res.cookie("jwt_token",token);
    
    res.status(201).json({
        message:"User Registered",
        user,
        token
    })


}

async function loginUser(req,res){
    const {email,password} = req.body;
    
    const isUserExist = await userModel.findOne({email})
    if(!isUserExist){
        return res.status(404).json({
            message:"User not Found"
        })
    }

    const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);
    if(!isPasswordMatch){
        return res.status(400).json({
            message:"Invalid Credentials"
        })
    }
    const token = jwt.sign({
        id:isUserExist._id,
        email:isUserExist.email,
        username:isUserExist.name
    },process.env.JWT_SECRET);
    res.cookie("jwt_token",token);

    res.status(200).json({
        message:"User Logged In",
        user:isUserExist,
        token
    })
}

async function getMeController(req,res){
    const userId = req.user.id;
    const user = await userModel.findById(userId)

    res.status(200).json({
        username: user.name,
        email: user.email,
        bio: user.bio,
        profilePicture: user.profilePicture
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMeController
}

