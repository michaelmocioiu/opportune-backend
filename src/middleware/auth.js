// middleware/auth.js
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new Error('No authentication token provided');
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user info to request
        req.userId = decoded.userId;
        
        next();
    } catch (error) {
        res.status(401).json({
            error: 'Authentication failed',
            message: error.message
        });
    }
};

module.exports = authMiddleware;