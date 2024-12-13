const jwt = require('jsonwebtoken');
const process = require('process');

function authenticateJWT(req, res, next) {

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: 'Authorization token missing' });
    }
}


async function generateJWT(payload, expiresIn = '4h') {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

module.exports = { authenticateJWT, generateJWT };