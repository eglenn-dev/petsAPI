require('dotenv').config();
const process = require('process');
const { MongoClient } = require('mongodb');

const userModel = [];

userModel.findByCredentials = async (username, password) => {
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1nwrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const client = new MongoClient(uri);
    let user;
    try {
        await client.connect();
        const database = client.db('petshelter');
        const collection = database.collection('users');
        user = await collection.findOne({ username, password });
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
    return user;
}

