const jwtHepler = require('./../utils/jwt.helper')

const isAuth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.split(" ")[1];
        if (token) {
            const decoded = await jwtHepler.verifyToken(token);
            req.user = decoded.data;
            next();
        } else {
            throw new Error("UNAUTHORIZED");
        }
    } catch (error) {
        return res.status(401).json({
            status: 401,
            message: error.message,
        })
    }

}
const isAdmin = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.split(" ")[1];
        if (token) {
            const decoded = await jwtHepler.verifyToken(token);
            console.log(decoded.data);
            req.user = decoded.data
            if (decoded.data?.role == "admin") {
                next();
            } else {
                throw new Error("UNAUTHORIZED");
            }
            next();
        } else {
            throw new Error("UNAUTHORIZED");
        }
    } catch (error) {
        return res.status(401).json({
            status: 401,
            message: error.message,
        })
    }
}

module.exports = {
    isAuth,
    isAdmin
}