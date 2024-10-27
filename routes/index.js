const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const userRouter = require('./userRoute');
const petsRouter = require('./petsRoute');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/user', userRouter);
router.use('/pets', petsRouter);

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Pet API' });
});

module.exports = router;