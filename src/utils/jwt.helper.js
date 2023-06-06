const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const generateToken = (data) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {
                data: data
            },
            JWT_SECRET_KEY,
            {
                algorithm: "HS256",
                expiresIn: JWT_EXPIRES_IN,
            },
            (error, token) => {
                if (error) {
                    console.error(error);
                    return reject(error);
                }
                resolve(token);
            });
    });
}
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET_KEY, (error, decoded) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            resolve(decoded);
        });
    });
}

module.exports = {
    generateToken,
    verifyToken
}