require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri =  process.env.DB_URI;


const client = new MongoClient(uri)

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("ChatMessengerAI").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // databasesList = await client.db().admin().listDatabases();
    // console.log("Databases:");
    // databasesList.databases.forEach(db => console.log(` - ${db.name}`));

  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);

async function closeConnection() {
  await client.close()
} 
const connectToDatabase = async () => {
  console.log("Test");
    if (!isConnected(client)) {
      console.log("fixing client connection");
      await client.connect();
    }
    return client.db("ChatMessengerAI");
}

function isConnected(client) {
  
  var obj = client.db('ChatMessengerAI');
  if (obj.connected == true) {
    console.log('connection check success');
    return(true);
  }
  else {
    console.log('connection check error');
    return(false);
  }
}
    

function connectionpointer() {
  return client;
}
// console.log(client)
module.exports = {
  connectToDatabase,
  closeConnection,
  connectionpointer
};
