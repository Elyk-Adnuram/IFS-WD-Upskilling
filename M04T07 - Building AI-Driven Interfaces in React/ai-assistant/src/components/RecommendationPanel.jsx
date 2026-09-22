import RecommendationCard from "./RecommendationCard";

export default function RecommendationPanel({ recommendations }) {
  return (
    <div className="recommendations-panel">
      <h2>Recommended Topics 📚</h2>
      {recommendations.map((item) => (
        <RecommendationCard key={item.id} title={item.title} description={item.description} />
      ))}
    </div>
  );
}
