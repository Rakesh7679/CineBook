const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    caption:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:[true,"Image URL is required"],


    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User ID is required"]
    }
})

const postModel = mongoose.model("Post",postSchema);

module.exports = postModel;