// import React, { useState } from "react";
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from "@chatscope/chat-ui-kit-react"


// const apiKey = "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";
// const systemMessage = {
//   role: "system",
//   content: "Explain things like you're talking to a software professional with 2 years of experience."
// }

// //Setting prompts and response for the front-end.
// export default function Gpt() {

// const [messages, setMessages] = useState([
//   {
//     message: "Hello, I am GPT-AI",
//     SentTime: "just now",
//     sender: "ChatGPT"
//   }
// ]);

// const [serverMessages, setServerMessages] = useState([
//   {
//     message: "Hello, I am GPT-AI",
//     SentTime: "just now",
//     sender: "ChatGPT"
//   }
// ]);

// const [typing, setTyping] = useState(false)

// const handleSend = async (message) =>{
//   const newMessage = {
//      message,
//     sender: "User",
//     direction: "outgoing",
//     sentTime: new Date().toLocaleTimeString(),
//   };
// const newMessages = [...messages, newMessage]; // Old message + can see the new message.

//   // Update message state
//   setMessages(newMessages);
//   //typing indicator for chatgpt.

//   setTyping(true)
//   // process message to chatGPT (send it over and see the response)

//   await processMessageToGPT (newMessages);
// }

//   async function processMessageToGPT(chatMessages) {
//     let currentGptMessage = "";
//     let apiMessages = chatMessages.map((messageObject) => {
//       let role = "";
//       if (messageObject.sender === "ChatGPT") {
//         role = "assistant"
//       }
//       else{
//         role = "user"
//       }
//       return {role: role, content: messageObject.message}
//     });
//     const apiResquestBody = {
//       "model": "gpt-3.5-turbo",
//       "messages": [
//         systemMessage,
//         ...apiMessages
//       ],
//       max_tokens: 2048,
//     }
//     await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         'Authorization': `Bearer ${apiKey}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify (apiResquestBody)
//     }).then((data) => {
//       return data.json();
//     }).then ((data) =>{
//       console.log("New request")
//       console.log(data);
//       console.log(data.choices[0].message.content);
//       currentGptMessage=data.choices[0].message.content;
//       setMessages(
//         [...chatMessages,{
//           message: data.choices[0].message.content,
//           sender: "ChatGPT",
//           direction: "incoming",
//           sentTime: new Date().toLocaleTimeString(),
//         }]
//       )})
//       setTyping(false)
      
//       await fetch("http://localhost:3000/Chat", {
//         method: "POST",
//         headers: {"Content-type": "application/json"},
//         body: JSON.stringify({gpt_message:apiMessages[apiMessages.length - 1].content})}
//         ).then(response => response.json()).then((data) => {
//           console.log("From server")
//           console.log(data)
//           console.log("Not from server")
//           setServerMessages(data)
//         });
//   }


//   return (
//     <div className="App">
//       <div style={{position: "relative", height: "800px",width: "700px"}}>
//         <MainContainer>
//           <ChatContainer>
//             <MessageList
//             scrollBehavior="smooth"
//             typingIndicator = {typing ? <TypingIndicator content = "GPT-AI is typing.."/> : null}
//             >
//               {messages.map((message, i)=>{
//                 return <Message key ={i} model ={message}/>
//               })}
//             </MessageList>
//             <MessageInput placeholder = "Type Something Intelligent..." onSend = {handleSend}/>
//           </ChatContainer>
//         </MainContainer>
//       </div>
//     </div>
//   );
//             }
  
  


































//             import React, { useState } from "react";
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from "@chatscope/chat-ui-kit-react"


// const apiKey = "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";
// const systemMessage = {
//   role: "system",
//   content: "Explain things like you're talking to a software professional with 2 years of experience."
// }

// //Setting prompts and response for the front-end.
// export default function Gpt() {

// const [messages, setMessages] = useState([
//   {
//     message: "Hello, I am GPT-AI",
//     SentTime: "just now",
//     sender: "ChatGPT"
//   }
// ]);

// const [serverMessages, setServerMessages] = useState([
//   {
//     message: "Hello, I am GPT-AI",
//     SentTime: "just now",
//     sender: "ChatGPT"
//   }
// ]);

// const [e, ae] = useState(false);

// const [typing, setTyping] = useState(false)

// const handleSend = async (message) =>{
//   // console.log("actual messages")
//   // console.log(messages)
//   // console.log("server messages")
//   // console.log(serverMessages)
//   const newMessage = {
//      message,
//     sender: "User",
//     direction: "outgoing",
//     sentTime: new Date().toLocaleTimeString(),
//   };
// const newMessages = [...messages, newMessage]; // Old message + can see the new message.

//   // Update message state
//   setMessages(newMessages);
//   //typing indicator for chatgpt.

//   setTyping(true)
//   // process message to chatGPT (send it over and see the response)

//   await processMessageToGPT (newMessages);
// }

//   async function processMessageToGPT(chatMessages) {
//     let currentGptMessage = "";
//     let apiMessages = chatMessages.map((messageObject) => {
//       let role = "";
//       if (messageObject.sender === "ChatGPT") {
//         role = "assistant"
//       }
//       else{
//         role = "user"
//       }
//       return {role: role, content: messageObject.message}
//     });
//     const apiResquestBody = {
//       "model": "gpt-3.5-turbo",
//       "messages": [
//         systemMessage,
//         ...apiMessages
//       ],
//       max_tokens: 2048,
//     }
//     await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         'Authorization': `Bearer ${apiKey}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify (apiResquestBody)
//     }).then((data) => {
//       return data.json();
//     }).then ((data) =>{
//       // console.log("New request")
//       // console.log(data);
//       // console.log(data.choices[0].message.content);
//       // console.log("Format for messages")
//       // console.log(messages)
//       // currentGptMessage=data.choices[0].message.content;
//       console.log(e);
//       ae(true)
//       console.log(e);
//       setMessages(
//         [...chatMessages,{
//           message: data.choices[0].message.content,
//           sender: "ChatGPT",
//           direction: "incoming",
//           sentTime: new Date().toLocaleTimeString(),
//         }]
//       )})
//       setTyping(false)
      
//       await fetch("http://localhost:3000/Chat", {
//         method: "POST",
//         headers: {"Content-type": "application/json"},
//         body: JSON.stringify({gpt_message:apiMessages[apiMessages.length - 1].content})}
//         ).then(response => response.json()).then((data) => {
//           // console.log("From server")
//           // console.log(data)
//           // console.log("Not from server")
//           setServerMessages(data)

//           // console.log("actual messages")
//           // console.log(messages)
//           // console.log("server messages")
//           // console.log(serverMessages)
//         });
//   }


//   return (
//     <div className="App">
//       <div style={{position: "relative", height: "800px",width: "700px"}}>
//         <MainContainer>
//           <ChatContainer>
//             <MessageList
//             scrollBehavior="smooth"
//             typingIndicator = {typing ? <TypingIndicator content = "GPT-AI is typing.."/> : null}
//             >
//               {messages.map((message, i)=>{
//                 return <Message key ={i} model ={message}/>
//               })}
//             </MessageList>
//             <MessageInput placeholder = "Type Something Intelligent..." onSend = {handleSend}/>
//           </ChatContainer>
//         </MainContainer>
//       </div>
//     </div>
//   );
//             }
  
  
