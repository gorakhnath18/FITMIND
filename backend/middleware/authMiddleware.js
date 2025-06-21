 const jwt = require('jsonwebtoken');
const User = require('../models/User');

// This is our gatekeeper function
const protect = async (req, res, next) => {
    let token;

    // A valid request will have a header like: 'Authorization': 'Bearer <the_jwt_token>'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. Extract the token from the header (split by space and take the second part)
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify the token's signature using the same secret from our .env file
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. If the token is valid, it contains the user's ID.
            //    Find that user in the database but exclude their password from the result.
            req.user = await User.findById(decoded.id).select('-password');
            
            // 4. Everything is good. Call 'next()' to pass control to the actual route handler (the controller).
            next();
        } catch (error) {
            console.error('Token verification failed', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If there's no token at all in the header
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

module.exports = { protect };