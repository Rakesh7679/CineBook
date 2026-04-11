const express = require("express");
const authRouter = express.Router();

const {registerUser, loginUser} = require("../controller/auth.controller");
const identifyUser = require("../middleware/auth.middleware");
const {getMeController} = require("../controller/auth.controller");


authRouter.post("/register", registerUser)
//Login route
authRouter.post("/login", loginUser)

authRouter.get("/get-me", identifyUser, getMeController)


module.exports = authRouter;