const mongoose = require('mongoose');

const followSchema = mongoose.Schema({
    follower:{
        type:String,
        required:true
    },
    followee:{
        type:String,
        required:true
       
    },
    status:{
        type:String,
        default:"pending",
        enum:{
            values:["pending","accepted","rejected"],
            message:"Status should be either pending, accepted or rejected"
        },
        
    }
},{
    timestamps:true
})

// Prevent duplicate request records between same users.
followSchema.index({ follower: 1, followee: 1 }, { unique: true });

const follwModel = mongoose.model("follow",followSchema);

module.exports = follwModel;