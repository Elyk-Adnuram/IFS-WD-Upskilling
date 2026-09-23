import Header from "./components/Header";
import Transparency from "./components/Transparency";
import Fallback from "./components/Fallback";
import Feedback from "./components/Feedback";
import Uncertainty from "./components/Uncertainty";
import "./App.css";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />

        <main className="main-content">
          <Transparency />
          <Uncertainty />
          <Feedback />
          <Fallback />
        </main>
        {/* Footer Disclosures */}
        <footer className="app-footer">
          <p>
            Designed using Responsible AI UX Principles • Transparency, Human Oversight, &
            Inclusivity
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
