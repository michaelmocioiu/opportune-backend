const express = require('express');
const { body, validationResult } = require('express-validator');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// User Signup
router.post(
    '/signup',
    [
        body('firstname').notEmpty().withMessage('Name is required'),
        body('lastname').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('type').notEmpty().withMessage("Must Have A Type")
    ],
    signup
);

// User Login
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    login
);

module.exports = router;