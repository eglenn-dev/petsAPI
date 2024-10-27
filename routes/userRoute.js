const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT } = require('../middleware/authMiddleware');

router.post('/login', userController.login);
router.post('/logout', authenticateJWT, userController.logout);


module.exports = router;