const process = require('process');
const { generateJWT } = require('../middleware/authMiddleware');

exports.login = async ({ query: { code } }, res) => {
    const body = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_REDIRECT_URI
    };

    try {
        const fetch = (await import('node-fetch')).default;

        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)

        });

        if (!response.ok) {
            const errorData = await response.json()
            console.error("GitHub OAuth Error", errorData);
            return res.status(response.status).json({ message: 'GitHub OAuth Error: ' + errorData.error_description });
        }
        const data = await response.json();
        const access_token = data.access_token;



        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `token ${access_token}`
            }
        });

        if (!userResponse.ok) {
            console.error("Error Fetching User Data:", userResponse.status, userResponse.statusText)
            return res.status(userResponse.status).json({ message: 'Error Fetching User Data' });
        }

        const user = await userResponse.json();
        const token = await generateJWT({ username: user.login });
        res.cookie('jwt_token', token, { httpOnly: true, secure: true });
        res.cookie('access_token', access_token, { httpOnly: true, secure: true });



        res.status(200).json({
            message: 'Logged in successfully',
            username: user.login,
            token
        });


    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};