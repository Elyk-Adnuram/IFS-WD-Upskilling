import { useState } from "react";
import "./App.css";
import RecommendationPanel from "./components/RecommendationPanel";
import ChatHistory from "./components/ChatHistory";

function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [aiResponse, setAIResponse] = useState("");
  const [dataLoading, setDataLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSubmit = async () => {
    // Check if prompt is empty
    if (!userPrompt.trim()) {
      setErrors("Please enter a message before clicking the submit button.");
    }
    setDataLoading(true);
    setErrors(null);
    setUserPrompt;
    ("");
    try {
      const apiURL = `https://text.pollinations.ai/${encodeURIComponent(userPrompt)}`;
      const apiResult = await fetch(apiURL);
      const apiData = await apiResult.text();
      setAIResponse(apiData);
      setHistory((prevHistory) => {
        [...prevHistory, { question: userPrompt, answer: apiData }];
      });
    } catch (err) {
      setErrors("Unable to generate a response at this time. Try again.");
      console.log(err);
    } finally {
      setDataLoading(false);
    }
  };

  return (
    <>
      <main>
        <h1>Gizmo AI Learning Assistant</h1>
        <input
          type="text"
          value={userPrompt}
          placeholder="Enter your prompt here"
          onChange={(event) => {
            setUserPrompt(event.target.value);
          }}
        />
        <button type="Submit" onClick={handleSubmit} disabled={dataLoading}>
          Submit
        </button>
        {dataLoading && <p>Generating response...</p>}
        {errors && <p>{errors}</p>}
        {aiResponse && (
          <div className="response-panel">
            <h2>AI Response</h2>
            <p>{aiResponse}</p>
          </div>
        )}
        <br></br>
        <br></br>
        {/* <ChatHistory history={history} /> */}
        <RecommendationPanel recommendations={recommendations} />
      </main>
    </>
  );
}

export default App;
