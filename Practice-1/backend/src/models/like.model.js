const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:[true,"Post is required"]
    },
    user:{
        type:String,
        required:[true,"User is required"]
    }
},{
    timestamps:true 
});
//Index to ensure a user can like a post only once
likeSchema.index({ post: 1, user: 1 }, { unique: true });

const likeModel = mongoose.model("like",likeSchema);

module.exports = likeModel;