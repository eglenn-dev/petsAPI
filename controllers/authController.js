const process = require('process');

exports.login = async ({ query: { code } }, res) => {
    const body = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
    };

    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            return res.status(500).json({ message: 'Error logging in' });
        }
        const data = await response.text();
        const access_token = new URLSearchParams(data).get('access_token');
        res.cookie('access_token', access_token, { httpOnly: true, secure: true });

        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `token ${access_token}`
            },
        });
        const user = await userResponse.json();

        res.status(200).json({
            message: 'Logged in successfully',
            username: user.login
        });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}