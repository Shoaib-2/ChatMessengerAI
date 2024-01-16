import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

//Setting prompts and response for the front-end.
export default function Gpt() {
  const [serverMessages, setServerMessages] = useState({
    messages: [
      {
        message: "Hello, I am GPT-AI",
        SentTime: "just now",
        sender: "ChatGPT",
      },
    ],
  });

  const [typing, setTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      sender: "User",
      direction: "outgoing",
      sentTime: new Date().toLocaleTimeString(),
    };
    const newMessages = [...serverMessages["messages"], newMessage]; // Old message + can see the new message.

    // Update message state
    setServerMessages({ messages: newMessages });
    //typing indicator for chatgpt.

    setTyping(true);
    // process message to chatGPT (send it over and see the response)

    await processMessageToGPT(newMessages);
  };

  async function processMessageToGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    await fetch("http://localhost:3000/Chat", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        gpt_message: apiMessages[apiMessages.length - 1].content,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setServerMessages(data);
      });

    setTyping(false);
  }

  return (
    <div className="App">
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                typing ? <TypingIndicator content="GPT-AI is typing.." /> : null
              }
            >
              {serverMessages["messages"].map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput
              placeholder="Type Something Intelligent..."
              onSend={handleSend}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}
