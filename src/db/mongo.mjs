import { MongoClient } from "mongodb";

const url = 'mongodb://localhost:27017';

const client = new MongoClient(url);

let connection;

try{
  connection = await client.connect();
} catch (e){
  console.error(e);
}

const db = connection.db('local');

export default db;