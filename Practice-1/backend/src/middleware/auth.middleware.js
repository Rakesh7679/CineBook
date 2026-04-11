const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next) {
        const token = req.cookies.jwt_token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.id;
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }


}
module.exports = identifyUser;