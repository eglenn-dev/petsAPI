require('dotenv').config();
const process = require('process');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const routes = require('./routes');

// Use body-parser middleware
app.use(cors()).use(bodyParser.json());
app.use(cors()).use(bodyParser.urlencoded({ extended: true }));

app.use(cors()).use('/', routes);

// Handle 404 - Not Found
app.use((req, res) => {
    res.status(404).send('404 - Not Found');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});