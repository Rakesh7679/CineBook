const mongoose = require("mongoose");

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to Database");
        
    })
    .catch((err)=>{
        console.log("Error connecting to database:", err.message);
    })
}

module.exports = connectToDb