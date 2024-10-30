const petModel = require('../models/petModel');
const { validationResult } = require('express-validator');


exports.getAllPets = async (req, res) => {
    try {
        const ownerId = req.query.ownerId;
        if (ownerId && !/^[0-9a-fA-F]{24}$/.test(ownerId)) {
            return res.status(400).json({ message: "Invalid Owner ID format" });
        }

        let pets;
        if (ownerId) {
            pets = await petModel.findByOwnerId(ownerId);
        } else {
            pets = await petModel.findAll();
        }

        res.status(200).json(pets);
    } catch (err) {
        console.error("Error getting pets:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.addPet = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newPet = {
            name: req.body.name,
            type: req.body.type,
            breed: req.body.breed,
            color: req.body.color,
            birthdate: req.body.birthdate,
            sex: req.body.sex,
            location: req.body.location,
            ownerId: req.body.ownerId
        };

        const savedPet = await petModel.save(newPet);
        res.status(201).json(savedPet);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        console.error("Error adding pet:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getPetById = async (req, res) => {
    try {
        const id = req.params.id;
        const pet = await petModel.findById(id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.status(200).json(pet);
    } catch (err) {
        console.error("Error getting pet by ID:", err);
        res.status(500).json({ message: 'Internal server error' });
    }

};

exports.updatePet = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        const id = req.params.id;
        if (!/^[0-9a-fA-F]{24}$/.test(id)) {
            return res.status(400).json({ message: 'Invalid Pet ID format' });
        }

        const updatedData = req.body;

        const updatedPet = await petModel.updateById(id, updatedData);

        if (!updatedPet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        res.status(200).json(updatedPet);
    } catch (err) {
        console.error("Error updating pet:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.deletePet = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await petModel.delete(id)
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.sendStatus(204);
    } catch (err) {
        console.error("Error deleting pet:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};