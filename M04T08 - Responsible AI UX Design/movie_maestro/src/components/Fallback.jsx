import React, { useState } from "react";

export default function FallbackSection() {
  // State to simulate loading, error, and recovery states
  const [status, setStatus] = useState("error"); // 'loading', 'error', 'success'

  const handleRetry = () => {
    setStatus("loading");
    // Simulate an API call retry
    setTimeout(() => {
      setStatus("error"); // Simulating a continued error for demonstration
    }, 1500);
  };

  return (
    <section className="section-card">
      <h2>4. Fallback Experiences & Error Handling ⚠️</h2>

      {/* Written answer to the UX requirement */}
      <p>
        When AI services fail or experience timeouts, the interface must prevent silence or crashes.
        It should inform the user clearly and provide alternative ways to continue browsing.
      </p>

      {/* Interface Example Component */}
      <div className="ui-example-container">
        <div className="error-fallback-card">
          {status === "loading" && (
            <div className="loading-state">
              <p>⏳ Retrying connection to AI service...</p>
            </div>
          )}

          {status === "error" && (
            <div className="error-state">
              <div className="error-header">
                <span className="error-icon">⚠️</span>
                <h4>AI Recommendation Service Unavailable</h4>
              </div>
              <p>
                The AI recommendation engine is temporarily unavailable. You can try refreshing or
                browse our manually curated lists below.
              </p>

              <div className="fallback-actions">
                {/* Retry Button */}
                <button className="btn-retry" onClick={handleRetry}>
                  🔄 Retry AI Service
                </button>
                {/* Manual Fallback Options */}
                <button
                  className="btn-secondary"
                  onClick={() => alert("Loading Trending Movies...")}
                >
                  🎬 View Trending Movies (Manual Search)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
