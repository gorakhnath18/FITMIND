const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        const user = await User.create({
            name,
            email,
            password,
        });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pfpUrl: user.pfpUrl,
            level: user.level,
            xp: user.xp,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Registration Error:', error); 
        res.status(500).json({ message: 'Server Error during registration' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide an email and password' });
    }

    try {
         
        const user = await User.findOne({ email }).select('+password');
        
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
         res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pfpUrl: user.pfpUrl,
            level: user.level,
            xp: user.xp,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error('Login Error:', error);  
        res.status(500).json({ message: 'Server Error during login' });
    }
};