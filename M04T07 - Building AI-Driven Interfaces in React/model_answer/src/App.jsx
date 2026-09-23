import React, { useState } from "react";
import RecommendationPanel from "./components/RecommendationPanel";
// 1. IMPORT THE TURNSTILE COMPONENT
// import { Turnstile } from "@marsidev/react-turnstile";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // 2. ADD STATE TO STORE THE TURNSTILE TOKEN
  // const [turnstileToken, setTurnstileToken] = useState(null);
  // console.log(turnstileToken);
  const handlePromptSubmit = async () => {
    if (!prompt.trim()) {
      setError("Please enter a question before submitting.");
      return;
    }
    // 3. CHECK IF THE TOKEN EXISTS BEFORE SENDING
    // if (!turnstileToken) {
    //   setError("Security verification in progress. Please wait a moment.");
    //   return;
    // }

    setLoading(true);
    setError(null);
    setResponse("");

    try {
      // Add a specific model selection parameter to the end of the template string
      // 1. Switch to the unified gen.pollinations.ai endpoint for authenticated requests
      // 2. Append your public key as a query parameter string
      const publicKey = "Z8v4co3vRfQ6r7RMm26z0cO5f8iBW48J"; // Get this from enter.pollinations.ai
      const apiUrl = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?key=${publicKey}`;
      // `https://text.pollinations.ai/${encodeURIComponent(prompt)}?key=${publicKey}`;

      const result = await fetch(apiUrl, {
        method: "GET",
      });

      if (!result.ok) {
        throw new Error("The API request was unsuccessful.");
      }

      const data = await result.text();

      setResponse(data);

      setHistory((previousHistory) => [
        ...previousHistory,
        {
          question: prompt,
          answer: data,
        },
      ]);

      setPrompt("");
    } catch (error) {
      setError("Unable to generate a response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <section className="assistant-panel">
        <h1>AI Learning Assistant</h1>

        <p>Ask a learning-related question about React, JavaScript, or AI-powered interfaces.</p>

        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Example: How does React state help with AI interfaces?"
        />

        <button onClick={handlePromptSubmit} disabled={loading}>
          {loading ? "Generating..." : "Ask AI"}
        </button>

        {loading && <p className="loading-message">Generating response...</p>}

        {error && <p className="error-message">{error}</p>}

        {response && (
          <section className="response-panel">
            <h2>AI Response</h2>
            <p>{response}</p>
          </section>
        )}
      </section>
      {/* 5. RENDER THE WIDGET (Using Cloudflare's public test key for now) */}
      {/* <div style={{ marginTop: "15px" }}>
        <Turnstile
          siteKey="1x00000000000000000000AA" // Replace with your live Cloudflare Site Key later
          onSuccess={(token) => setTurnstileToken(token)}
          onExpire={() => setTurnstileToken(null)}
          onError={() => setTurnstileToken(null)}
        />
      </div> */}
      <section className="history-panel">
        <h2>Conversation History</h2>

        {history.length === 0 ? (
          <p>No questions have been asked yet.</p>
        ) : (
          history.map((item, index) => (
            <div className="history-item" key={index}>
              <h3>Question</h3>
              <p>{item.question}</p>

              <h3>Response</h3>
              <p>{item.answer}</p>
            </div>
          ))
        )}
      </section>

      <RecommendationPanel />
    </main>
  );
}

export default App;
