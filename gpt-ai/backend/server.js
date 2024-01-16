// Different code
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

//Setting prompts and response for the front-end.

// async function connectToServer() {
//   const db = await connectToDatabase();
//   const collection = db.collection("user");
//   return collection;
// }

// async function disconnectFromServer(client) {
//   await client.close();
// }

// async function sendDataToSever(client, text) {
//   const result = await pointer2.insertOne({
//     _id: 13,
//     item: "anotherone2",
//     qty: 50,
//     type: "no.2",
//   });
// }



let messages = [
  {
    message: "Hello, I am GPT-AI",
    SentTime: "just now",
    sender: "ChatGPT",
  },
];

let connectionPointer = connectToDatabase();


let newMessages = [messages]

const apiKey = "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";
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
  // console.log("from 2nd func")
  // console.log(chatMessages)
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
      // console.log(data);
      // console.log(data.choices[0].message.content);
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

  // console.log(messages);
  // console.log(apiMessages[apiMessages.length - 1].content);
  // console.log(newMessages);
}

app.post("/Chat", async (req, res, next) => {
  // userMessage = req.body['gpt_message'];
  messages = await handleSend(req.body['gpt_message']);
  // console.log("this is messages")
  // console.log(messages)
  res.send({"messages": messages});
  // console.log(req.body);
  // console.log(messages[messages.length - 1])
  
  // console.log(messages[messages.length - 2])
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

