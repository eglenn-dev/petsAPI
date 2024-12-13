const express = require('express');
const router = express.Router();
const process = require('process');
const authController = require('../controllers/authController');

router.get('/', (req, res) => {
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=user`;
    res.redirect(redirectUrl);
});

router.get('/callback', authController.login);

router.post('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.clearCookie('jwt_token')
    res.sendStatus(200);
});


module.exports = router;