require('dotenv').config();
const process = require('process');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const cookieParser = require('cookie-parser');


// Use body-parser middleware
app.use(cors()).use(bodyParser.json());
app.use(cors()).use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', routes);


// Handle 404 - Not Found
app.use((req, res) => {
    res.status(404).send('404 - Not Found');
});

// Global error handler
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});