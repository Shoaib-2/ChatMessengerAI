//Calling all the dependencies or the imports.
require('dotenv').config();
const express = require ('express')
const cors = require ('cors')
const bodyParser = require ('body-parser')
const {OpenAI} = require('openai')

//The API key : this will go into an .env file to hide it.
const Openai = new OpenAI ({
    apiKey: process.env.OPENAI_API_KEY,
});
console.log(Openai)
const openai = new OpenAI(Openai)

//app using express.
const app = express();

//Getting information in json format.
app.use(bodyParser.json());

//Using cors for middleware of express.
app.use(cors());

//End-point for connecting back-end to the frond-end. Using the /chat for connecting it.
app.post("/chat", async(req, res) => {
    //For user prompts.
    const {prompt} = req.body

    //For completion and getting the response from openAi.
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": "Hello!"}],
        max_tokens: 10,
        prompt: prompt,
      });
      console.log(chatCompletion.choices[0].message);
})
const PORT = 8000;
//Checking if the port is running or not
app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
})