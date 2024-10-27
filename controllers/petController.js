const petModel = require('../models/petModel');

exports.getAllPets = async (req, res) => {
    try {
        const ownerId = req.query.ownerId;

        let pets;
        if (ownerId) {
            pets = await petModel.findByOwnerId(ownerId);
        } else {
            pets = await petModel.findAll();
        }

        res.status(200).json(pets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



exports.addPet = async (req, res) => {
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
        res.status(400).json({ message: err.message });
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
        res.status(500).json({ message: err.message });
    }

};



exports.updatePet = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const updatedPet = await petModel.updateById(id, updatedData);

        if (!updatedPet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        res.status(200).json(updatedPet)
    } catch (err) {

        res.status(404).json({ message: err.message });
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
        res.status(500).json({ message: err.message });
    }
};