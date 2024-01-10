import React, { useState } from "react";
import axios from "axios";

//Setting prompts and response for the front-end.
export default function Gpt() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const HTTP = "http://localhost:8000/chat";
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${HTTP}`, { prompt })
      .then((res) => setResponse(res.data))
      .catch((error) => {
        console.log("Error with API", error);
      });
  };
  const handlePrompt = (e) => setPrompt(e.target.value);
  return (
    <div className="App">
      <h1 className="title text-centre text-darkGreen">GenAi Chat Messenger</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Ask Me Anything, I am here to help.</label>
          <input
            type="text"
            className="shadow-sm"
            placeholder="Type something intelligent..."
            value={prompt}
            onChange={handlePrompt}
          >
          </input>
        </div>
      </form>
      <div className="bg-darkGreen mt-2 p-1 border-5">
        <p className="text-light">
            {response ? response:"Feel free to ask.." }
            </p>
      </div>
    </div>
  );
}
