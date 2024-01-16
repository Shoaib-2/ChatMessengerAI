require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri =  process.env.DB_URI;


const client = new MongoClient(uri)
async function closeConnection() {
  await client.close()
} 
const connectToDatabase = async () => {
  console.log("Test");
    if (!isConnected(client)) {
      console.log("Intialzing client connection");
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

async function sendDataToSever(text) {
  const result = await client.db("ChatMessengerAI").collection("chats").insertOne({
    message: text["message"],
    sender: text["sender"],
    direction: text["direction"],
    sentTime: text["sentTime"],
  });
}

module.exports = {
  connectToDatabase,
  closeConnection,
  sendDataToSever
};
