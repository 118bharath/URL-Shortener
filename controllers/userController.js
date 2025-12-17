import { v4 as uuidv4 } from 'uuid';
import User from '../models/users.js';
import { setUser } from '../service/auth.js';

export const handleUserSignUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await User.create({
            name,
            email,
            password,
        });
        return res.redirect('/');
    } catch (error) {
        if (error.code === 11000) {
            return res.render('signup', {
                error: "Email already in use"
            });
        }
        return res.render('signup', {
            error: "An error occurred. Please try again."
        });
    }
}
export const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password,
    });
    if (!user) return res.render('login', {
        error: "Invalid username or password"
    });

    const token = setUser(user);
    res.cookie('token', token);
    return res.redirect('/');
}