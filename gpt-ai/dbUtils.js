const { MongoClient, ServerApiVersion } = require("mongodb") ;


const uri = 'mongodb+srv://RadicalGenAI:<O64Qi0Zb4eDqaZsi>@shoaibgenaidb.h06439j.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

const connectToDatabase = async () => {
    if (!client.isConnected()) {
        await client.connect();
    }
    return {
        db: client.db("@shoaibgenaidb.h06439j.mongodb.net")
        }
}
module.exports = connectToDatabase;