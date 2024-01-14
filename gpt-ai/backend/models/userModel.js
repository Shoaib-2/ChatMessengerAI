const { connectToDatabase, closeConnection } = require('../dbUtils.js');

const insertUserDocument = async (db, user) => {
  const collection = db.collection('user');
  await collection.insertOne(user);
};

module.exports = {
  createUser: async (userData) => {
    try {
      const db = await connectToDatabase();
      // console.log(db)
      await insertUserDocument(db, userData);
      console.log('User document saved successfully');
    } catch (error) {
      console.error('Error saving user document:', error);
    } finally {
      closeConnection();
    }
  }
};