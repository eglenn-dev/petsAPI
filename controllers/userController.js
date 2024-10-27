const userModel = require('../models/userModel');
const { generateJWT } = require('../middleware/authMiddleware');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userModel.findByCredentials(username, password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = await generateJWT({ id: user.id });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.logout = (req, res) => {
    res.json({ message: 'Logout successful', token: null });
};