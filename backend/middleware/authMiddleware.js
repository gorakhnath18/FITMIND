const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const protect = async (req, res, next) => {
    let token;

    // The token is expected in the format: "Bearer <token>"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using our secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token's ID and attach it to the request object
            // We exclude the password from being attached
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Move on to the next piece of middleware or the controller
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };