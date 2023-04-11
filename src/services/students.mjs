import db from '../db/mongo.mjs';

const collection = db.collection('students');

const getAllStudents = async () => {
 let cursor = collection.find({});
  const results = await cursor.toArray();
  return results;
}

const saveStudent = async (data) => {
  let savedResult = await collection.insertOne(data);
  return savedResult;
}

export {
  saveStudent,
  getAllStudents
}