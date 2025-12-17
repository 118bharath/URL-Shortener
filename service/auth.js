// const sessionIdToUsermap=new Map();
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET_KEY;

export const setUser = (user) => {
    const payLoad = {
        _id: user._id,
        email: user.email,
        role: user.role,
    };
    return jwt.sign(payLoad, secret);
}

export const getUser = (token) => {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

