const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

import { hash } from 'bcryptjs';
import { faker } from '@faker-js/faker';

const p = "password";

const createFakeUser = () => {
    const password = hash(p, 10);

    const user = {
        username: faker.name.firstName(),
        password: password,
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
    };
    return user;
}

const createFakeArea = () => {
    const area = {
        name:  faker.name.jobArea(),
        tags: [],
    };
    return area;
}

const createFakeTag = () => {
    const tag = {
        name: faker.word.noun(),
    }
    return tag;
}

const createFakeDocument = () => {
    const document = {
        title: faker.system.fileName(),
        folio: faker.random.numeric(),
        expediente: faker.random.numeric(),
        createdAt: faker.date.past(),
        createdBy: faker.random.uuid(),
        area: faker.random.uuid(),
        tags: [],
        metadata: Array.from({length: 10}, () => {[faker.random.word()]: faker.random.word()}),
    }
    return document;
}

const createFakeLog = () => {
    const log = {
        user: faker.random.uuid(),
        action: faker.random.word(),
        createdAt: faker.date.past(),
    }
    return log;
}

const createFakeBatch = () => {
    const batch = {
        name: faker.system.fileName()
    }
    return batch;
}

const DB = "e2e";
const url = "mongodb://localhost:27017";

const data = {
    area,
    user,
    document,
    log,
    tag,
    batch
}

const oidToObjectId = (jsonData) =>
  jsonData.map((item) =>
    !!item.realtor
      ? {
          ...item,
          _id: ObjectId(item._id["$oid"]),
          realtor: ObjectId(item.realtor["$oid"]),
          createdAt: item.createdAt["$date"],
          updatedAt: item.updatedAt["$date"],
        }
      : {
          ...item,
          _id: ObjectId(item._id["$oid"]),
          createdAt: item.createdAt["$date"],
          updatedAt: item.updatedAt["$date"],
        }
  );

const dropAndSeed = async (mongoClient, collectionName, jsonData) => {
    const collection = mongoClient.db(DB).collection(collectionName);
    const data = oidToObjectId(jsonData);

    try{ 
        await collection.drop()
    }
    catch(e){
        console.log("Collection failed to drop")
        return
    }
    
    try {
        await collection.insertMany(data);
        console.log("Collection seeded");
    } catch (e) {
        console.log("Collection failed to seed");
    }
}

const seedDB = async () => {

    const mongoClient = new MongoClient(`${url}/${DB}`, { useUnifiedTopology: true });

    try {
        await mongoClient.connect();
        console.log("Connected to DB");

        for (const key of data) {
            await dropAndSeed(mongoClient, key, data[key]);
        }
    }
    catch (e) {
        console.log("Failed to connect to DB");
        return
    }
}

const seedDBRequest = async (req, res) => {
    await seedDB();
    res.json("DB seeded");
}


module.exports = {
    seedDBRequest
}
