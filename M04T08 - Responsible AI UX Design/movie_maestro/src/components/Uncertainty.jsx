import { useState } from "react";

export default function Uncertainty() {
  // Mock data representing AI recommendations with different confidence levels
  const [movies] = useState([
    {
      id: 1,
      title: "Blade Runner 2049",
      score: 0.92,
      summary: "A young Blade Runner unearths a long-buried secret.",
    },
    {
      id: 2,
      title: "Arrival",
      score: 0.68,
      summary: "A linguist works with the military to communicate with alien lifeforms.",
    },
    {
      id: 3,
      title: "Stalker",
      score: 0.45,
      summary: "A guide leads two men through a mysterious hazardous wasteland.",
    },
  ]);

  // Helper function to render conditional confidence badges based on score thresholds
  const renderConfidenceBadge = (confidence) => {
    if (confidence > 0.8) {
      return (
        <span className="badge badge-high">High Confidence ({Math.round(confidence * 100)}%)</span>
      );
    }
    if (confidence > 0.5) {
      return (
        <span className="badge badge-med">
          Moderate Confidence ({Math.round(confidence * 100)}%)
        </span>
      );
    }
    return (
      <span className="badge badge-low">Low Confidence ({Math.round(confidence * 100)}%)</span>
    );
  };

  return (
    <section className="section-card">
      <h2>2. Communicating Uncertainty & Inaccuracies 📊</h2>

      {/* Written answer to the UX requirement */}
      <p>
        AI models operate on probabilities rather than fixed rules. To maintain calibrated trust,
        our interface uses explicit confidence badges and probabilistic language ("Suggested") to
        ensure users interpret outputs realistically.
      </p>

      {/* Interface Example Component */}
      <div className="ui-example-container">
        <h3>Suggested Recommendations</h3>
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card-compact">
              <div className="card-top">
                <h4>{movie.title}</h4>
                {/* Dynamically render confidence badge */}
                {renderConfidenceBadge(movie.score)}
              </div>
              <p>{movie.summary}</p>
              <div className="accuracy-warning">
                <small>AI-generated detail • Verify plot points before viewing</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
