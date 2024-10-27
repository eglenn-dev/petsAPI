import express from 'express';
import swaggerRouter from './swagger.mjs';
const router = express.Router();

router.use('/api-docs', swaggerRouter);

export default router;