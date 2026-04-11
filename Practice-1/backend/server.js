require("dotenv").config();
const app = require("./src/app.js");
const mongoose = require("mongoose");
const connectToDb = require("./src/config/Db.js")


connectToDb();

app.listen(3000,()=>{
   console.log("server is running on port 3000");
})


