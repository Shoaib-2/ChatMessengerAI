require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri =  process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri)

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const connectToDatabase = async () => {
    if (!client.isConnected()) {
        await client.connect();
    }
    return {
        db: client.db("ChatMessengerAI")
        }
}
module.exports = connectToDatabase;