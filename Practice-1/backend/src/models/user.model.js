const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bio:String,
    profilePicture:{
        type:String,
        default:"https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png"

    },
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ]

})

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;

