const express = require("express");
const app = express();
const userModel = require("./models/user.model.js")
const cors = require("cors");
const path = require("path");
const authRouter = require("./routes/user.auth.route.js")
const cookieParser = require("cookie-parser");
const postRouter = require("./routes/posts.route.js");
const userRoute = require("./routes/user.route.js")

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(express.static('./public')); 
app.use(cookieParser());

app.use("/api/auth",authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRoute);

app.use('*name', (req, res) => {
    res.sendFile(path.join(__dirname,"..", '/public/index.html'));
});

module.exports = app; 

