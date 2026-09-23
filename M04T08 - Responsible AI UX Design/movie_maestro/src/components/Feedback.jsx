import React, { useState } from "react";

export default function FeedbackSection() {
  // State to track user feedback for a recommendation
  const [feedback, setFeedback] = useState(null);
  const [isReported, setIsReported] = useState(false);

  const handleFeedback = (type) => {
    setFeedback(type);
    // In a full application, this would send data to an analytics API
  };

  return (
    <section className="section-card">
      <h2>3. User Feedback & Bias Mitigation </h2>

      {/* Written answer to the UX requirement */}
      <p>
        To reduce algorithmic bias and fix bad recommendations, our interface gives users direct
        control to rate content, adjust preferences, and report inaccurate AI summaries.
      </p>

      {/* Interface Example Component */}
      <div className="ui-example-container">
        <div className="feedback-card">
          <h4>Interstellar (2014)</h4>
          <p className="summary-preview">
            <em>AI Summary:</em> A team of explorers travel through a wormhole in space in an
            attempt to ensure humanity's survival.
          </p>

          <div className="feedback-actions">
            <p>Was this recommendation helpful?</p>

            {/* Rating Buttons */}
            <div className="button-group">
              <button
                className={`btn-thumb ${feedback === "helpful" ? "active" : ""}`}
                onClick={() => handleFeedback("helpful")}
              >
                👍 Helpful
              </button>
              <button
                className={`btn-thumb ${feedback === "unhelpful" ? "active" : ""}`}
                onClick={() => handleFeedback("unhelpful")}
              >
                👎 Not Interested
              </button>
            </div>

            {/* Confirmation Message */}
            {feedback && (
              <p className="feedback-status">
                Thanks! We will use this to improve future recommendations.
              </p>
            )}

            {/* Error Reporting Pathway */}
            <div className="report-box">
              {!isReported ? (
                <button className="btn-report" onClick={() => setIsReported(true)}>
                  Report Inaccurate Summary
                </button>
              ) : (
                <p className="report-submitted">Issue reported to our team for review.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
