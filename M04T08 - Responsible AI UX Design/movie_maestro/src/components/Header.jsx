export default function Header() {
  return (
    <header className="app-header">
      {/* Top Banner & Header Disclosures */}
      <h1>Movie Maestro: Responsible Movie Recommendation Platform</h1>
      <p className="subtitle">Responsible AI UX Design Framework & Demonstration</p>
      <div className="global-ai-notice">
        <p>
          <strong>System Notice:</strong> This platform utilizes AI algorithms for movie
          recommendations and summary generation. Outputs are predictive and may vary in accuracy.
        </p>
      </div>
    </header>
  );
}
