require('dotenv').config();
const process = require('process');
const { MongoClient, ObjectId } = require('mongodb');

const petModel = [];

petModel.fundByOwnerId = async (ownerId) => {
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1nwrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const client = new MongoClient(uri);
    let petsData;
    try {
        await client.connect();
        const database = client.db('petsAPI');
        const pets = database.collection('pets');
        petsData = await pets.find({ ownerId: ownerId }).toArray();
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return petsData;
}

petModel.findAll = async () => {
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1nwrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const client = new MongoClient(uri);
    let petsData;
    try {
        await client.connect();
        const database = client.db('petsAPI');
        const pets = database.collection('pets');
        petsData = await pets.find().toArray();
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return petsData;
}

petModel.findByOwnerId = async (ownerId) => {
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1nwrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const client = new MongoClient(uri);
    let petsData;
    try {
        await client.connect();
        const database = client.db('petsAPI');
        const pets = database.collection('pets');
        petsData = await pets.find({ ownerId: ownerId }).toArray();
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return petsData;
}

petModel.findById = async (id) => {
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1nwrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const client = new MongoClient(uri);
    let petData;
    try {
        await client.connect();
        const database = client.db('petsAPI');
        const pets = database.collection('pets');
        petData = await pets.findOne({ _id: new ObjectId(id) });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return petData;
}

petModel.updateById = async (id, updatedData) => {
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1nwrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const client = new MongoClient(uri);
    let updatedPet;
    try {
        await client.connect();
        const database = client.db('petsAPI');
        const pets = database.collection('pets');
        updatedPet = await pets.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updatedData }, { returnDocument: 'after' });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return updatedPet;
}

petModel.save = async (newPet) => {
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1nwrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const client = new MongoClient(uri);
    let savedPet;
    try {
        await client.connect();
        const database = client.db('petsAPI');
        const pets = database.collection('pets');
        savedPet = await pets.insertOne(newPet);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    console.log("Saved", savedPet);
    return savedPet;
}

petModel.delete = async (id) => {
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1nwrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const client = new MongoClient(uri);
    let deletedPet;
    try {
        await client.connect();
        const database = client.db('petsAPI');
        const pets = database.collection('pets');
        deletedPet = await pets.findOneAndDelete({ _id: new ObjectId(id) });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return deletedPet;
}

module.exports = petModel;