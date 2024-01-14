// /Calling all the dependencies or the imports.
require('dotenv/config');
const express = require ('express')
const cors = require ('cors')
const db = require ('mongodb');
const { connectToDatabase, closeConnection, connectionpointer } = require('./dbUtils.js') ;
const { Chat } = require('openai')
const UserModule = require('../backend/models/userModel.js')

//app using express.
const app = express();
//Using cors for middleware of express.
app.use(cors());
app.use(express.json());


//End-point for connecting back-end to the frond-end. Using the /chat for connecting it.
// app.post("/Chat", async(req, res) => {

//     //For user prompts.
//     const {message} = req.body
//     const userData = {
//         "name": { "first": "Alan", "last": "Turing" },
//              "birth": new Date(1912, 5, 23), // May 23, 1912                                                                                                                                 
//              "death": new Date(1954, 5, 7),  // May 7, 1954                                                                                                                                  
//              "contribs": [ "Turing machine", "Turing test", "Turingery" ],
//              "views": 1250000
//     }
//     UserModule.createUser(userData)
//     console.log(userData)
//     //For completion and getting the response from openAi.
//     try {
//         const db = await connectToDatabase();
//         databasesList = await client.db().admin().listDatabases();

//         const collection = db.collection('user');

//         await collection.insertOne({ userData });
//         client.close()
//         res.status(200).json({ message: 'Message saved successfully' });
//      } catch (error) {
//         res.status(500).json({ error: 'Error saving message' });
//      }
// })
app.get('/Chat', async (req, res)=>{
    try{
        const db = await connectToDatabase();
        const collection = db.collection('user');
        
        //This runs
        console.log("runs here");
        const result = await collection.insertOne(
            { _id: 13, item: "anotherone3", qty: 50, type: "no.3" }
        )
     
        // res.status(200).json(chatHistory);
        console.log("Sent data");
        console.log(result);
    }
    catch (error){
        res.status(500).json({error: error})
    }
})
const PORT = process.env.PORT || 5000
//Checking if the port is running or not
app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
})

//User database.
async  function connectToServer(){
    const db = await connectToDatabase();
        const collection = db.collection('user');
        return collection;
 } 



 async function disconnectFromServer(client){
    await client.close();
 }
 async function sendDataToSever(client, text){
    const result = await pointer2.insertOne(
        { _id: 13, item: "anotherone2", qty: 50, type: "no.2" }
    )
 }




