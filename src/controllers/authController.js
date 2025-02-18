const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
// Signup function
exports.signup = async (req, res) => {
    const { firstname, lastname, email, password, phone, type } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = new User({ firstname, lastname, email, password, phone, type });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user_id: user._id });
    } catch (err) {
        res.status(500).json({ message: 'Error creating user: ' + err.message });
    }
};

// Login function
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findOne({ email });
        console.log(user.password)
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id, role: user.type }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in: ' + err.message });
    }
};