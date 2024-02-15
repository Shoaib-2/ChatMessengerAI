///Calling all the dependencies or the imports.
require('dotenv/config');
const express = require ('express')
const cors = require ('cors')
const { db, Db } = require ('mongodb');
const { connectToDatabase } = require('./dbUtils.js') ;
const { chat } = require('openai');

//app using express.
const app = express();
//Using cors for middleware of express.
app.use(cors());
app.use(express.json());


//End-point for connecting back-end to the frond-end. Using the /chat for connecting it.
app.post("/chat", async(req, res) => {
    //For user prompts.
    const {message} = req.body

    //For completion and getting the response from openAi.
    try {
        const { db } = await connectToDatabase();
        const collection = db.collection('ChatMessengerAI');
        await collection.insertOne({ message });
        res.status(200).json({ message: 'Message saved successfully' });
     } catch (error) {
        res.status(500).json({ error: 'Error saving message' });
     }
})
app.get('/chat', async (req, res)=>{
    try{
        const {db} = await connectToDatabase();
        const collection = db.collection('chat');
        const chatHistory = await collection.find({}).toArray();
        res.status(200).json(chatHistory);
    }
    catch (error){
        res.status(500).json({error: 'Error fetching chat history!'})
    }
})
const PORT = process.env.PORT 
//Checking if the port is running or not
app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
})
