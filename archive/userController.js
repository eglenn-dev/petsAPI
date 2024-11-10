const userModel = require('../models/userModel');
const { generateJWT } = require('../middleware/authMiddleware');
const { validationResult } = require('express-validator');


exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password } = req.body;

        if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ message: 'Invalid input. Username and password are required strings.' });
        }

        const user = await userModel.findByCredentials(username, password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = await generateJWT({ id: user.id });
        res.status(200).json({ token });

    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        console.error("Login Error:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.logout = (req, res) => {
    res.status(200).json({ message: 'Logout successful', token: null });
};