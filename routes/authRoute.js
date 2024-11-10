const express = require('express');
const router = express.Router();
const process = require('process');

router.get('/', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=user`);
});

router.get('/callback', async ({ query: { code } }, res) => {
    const body = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
    };
    const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.text();
    const access_token = new URLSearchParams(data).get('access_token');
    res.cookie('access_token', access_token, { httpOnly: true, secure: true });

    const userResponse = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `token ${access_token}`
        },
    });
    const user = await userResponse.json();
    res.cookie('user', JSON.stringify(user), { httpOnly: true, secure: true });

    res.redirect(`http://localhost:3000?auth=true`);
});

module.exports = router;