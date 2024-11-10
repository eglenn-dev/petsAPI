const express = require('express');
const router = express.Router();
const process = require('process');
const authController = require('../controllers/authController');

router.get('/', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=user`);
});

router.get('/callback', authController.login);

module.exports = router;