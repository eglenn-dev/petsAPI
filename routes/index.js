const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const authRouter = require('./authRoute');
const petsRouter = require('./petsRoute');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/auth', authRouter);
router.use('/pets', petsRouter);

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Pet API' });
});

module.exports = router;