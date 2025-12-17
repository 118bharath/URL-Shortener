// const sessionIdToUsermap=new Map();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.JWT_SECRET_KEY;

const setUser = (user) => {
    const payLoad = {
        _id: user._id,
        email: user.email,
        role: user.role,
    };
    return jwt.sign(payLoad, secret);
}

const getUser = (token) => {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}