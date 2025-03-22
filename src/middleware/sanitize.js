// middleware/sanitize.js
const { validator } = require('validator');

const sanitizeInput = (req, res, next) => {
    try {
        // Sanitize request body
        if (req.body) {
            Object.keys(req.body).forEach(key => {
                if (typeof req.body[key] === 'string') {
                    // Remove HTML tags and encode special characters
                    req.body[key] = req.body[key]
                        .replace(/<[^>]*>/g, '')
                        .trim();
                }
            });

            // Validate email if present
            if (req.body.email) {
                if (!validator.isEmail(req.body.email)) {
                    throw new Error('Invalid email format');
                }
            }

            // Validate phone if present
            if (req.body.phone) {
                const phoneRegex = /^\+?[\d\s-]{10,}$/;
                if (!phoneRegex.test(req.body.phone)) {
                    throw new Error('Invalid phone number format');
                }
            }
        }

        next();
    } catch (error) {
        res.status(400).json({
            error: 'Input validation failed',
            message: error.message
        });
    }
};

module.exports = sanitizeInput;