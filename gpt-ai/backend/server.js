
require("dotenv/config");

const express = require("express");
const cors = require("cors");
const db = require("mongodb");
const {
  connectToDatabase,
  closeConnection,
  sendDataToSever,
} = require("./dbUtils.js");
const { Chat } = require("openai");
const UserModule = require("../backend/models/userModel.js");
const api_Key = process.env.OPENAI_API_KEY;
console.log(api_Key);
const app = express();
app.use(cors());
app.use(express.json());


let messages = [
  {
    message: "Hello, I am GPT-AI",
    SentTime: "just now",
    sender: "ChatGPT",
  },
];

let connectionPointer = connectToDatabase();


let newMessages = [messages]

const apiKey = process.env.OPENAI_API_KEY;
const systemMessage = {
  role: "system",
  content:
    "Explain things like you're talking to a software professional with 2 years of experience.",
};

async function handleSend (message) {
  try {
    const newMessage = {
      message,
      sender: "User",
      direction: "outgoing",
      sentTime: new Date().toLocaleTimeString(),
    };
    messages = [...messages, newMessage]; // Old message + can see the new message.
    await processMessageToGPT(messages);
    
    return messages
  } catch (e) { console.log(e); return messages; }
};

async function processMessageToGPT(chatMessages) {
  let currentGptMessage = "";
  let apiMessages = chatMessages.map((messageObject) => {
    let role = "";
    if (messageObject.sender === "ChatGPT") {
      role = "assistant";
    } else {
      role = "user";
    }
    return { role: role, content: messageObject.message };
  });
  const apiResquestBody = {
    model: "gpt-3.5-turbo",
    messages: [systemMessage, ...apiMessages],
    // max_tokens: 200,
  };
  await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiResquestBody),
  }).then((data) => {
      return data.json();
  }).then((data) => {
      console.log(data)
      currentGptMessage = data.choices[0].message.content;
      
      messages = [...messages,
      {
        message: data.choices[0].message.content,
        sender: "ChatGPT",
        direction: "incoming",
        sentTime: new Date().toLocaleTimeString(),
      }
    ]
  }
  );
}

app.post("/Chat", async (req, res, next) => {
  messages = await handleSend(req.body['gpt_message']);
  res.send({"messages": messages});
  sendDataToSever(messages[messages.length - 2]);
  sendDataToSever(messages[messages.length - 1]);

});


app.post('/', (req, res) => {
  res.send('hello world')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});

