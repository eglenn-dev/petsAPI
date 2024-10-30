const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { body, param } = require('express-validator');
// const { authenticateJWT } = require('../middleware/authMiddleware');

// router.use(authenticateJWT);

const validateAndSanitizePetInput = (method) => {
    switch (method) {
        case 'addPet':
            return [
                body('name').notEmpty().withMessage('Name is required').trim().escape(),
                body('type').notEmpty().withMessage('Type is required').trim().escape(),
                body('breed').notEmpty().withMessage('Breed is required').trim().escape(),
                body('color').notEmpty().withMessage('Color is required').trim().escape(),
                body('birthdate').notEmpty().withMessage('Birthdate is required').isISO8601().withMessage('Invalid date format'),
                body('sex').notEmpty().withMessage('Gender is required').trim().escape(),
                body('location').notEmpty().withMessage('Location is required').trim().escape(),
                body('ownerId').notEmpty().withMessage('Owner ID is required').escape(),
            ];
        case 'updatePet':
            return [
                body('name').notEmpty().withMessage('Name is required').trim().escape(),
                body('type').notEmpty().withMessage('Type is required').trim().escape(),
                body('breed').notEmpty().withMessage('Breed is required').trim().escape(),
                body('color').notEmpty().withMessage('Color is required').trim().escape(),
                body('birthdate').notEmpty().withMessage('Birthdate is required').isISO8601().withMessage('Invalid date format'),
                body('sex').notEmpty().withMessage('Gender is required').trim().escape(),
                body('location').notEmpty().withMessage('Location is required').trim().escape(),
                body('ownerId').notEmpty().withMessage('Owner ID is required').escape(),
            ];
        default:
            return [];
    }
};


router.get('/', petController.getAllPets);
router.post('/', validateAndSanitizePetInput('addPet'), petController.addPet);
router.get('/:id',
    param('id').isMongoId().withMessage('Invalid Pet ID'),
    petController.getPetById);
router.put('/:id',
    param('id').isMongoId().withMessage('Invalid Pet ID'),
    validateAndSanitizePetInput('updatePet'),
    petController.updatePet
);
router.delete('/:id',
    param('id').isMongoId().withMessage('Invalid Pet ID'),
    petController.deletePet);


module.exports = router;