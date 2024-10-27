const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
// const { authenticateJWT } = require('../middleware/authMiddleware');

// router.use(authenticateJWT);

router.get('/', petController.getAllPets);
router.post('/', petController.addPet);
router.get('/:id', petController.getPetById);
router.put('/:id', petController.updatePet);
router.delete('/:id', petController.deletePet);


module.exports = router;