import RecommendationCard from "./RecommendationCard";

export default function RecommendationPanel({ recommendations }) {
  const recommendations = [
    {
      id: 1,
      title: "React State Management",
      description: "Review how useState helps manage changing interface data.",
    },
    {
      id: 2,
      title: "Async JavaScript",
      description: "Revise how async and await are used when working with APIs.",
    },
  ];
  
  
  return (
    <div className="recommendations-panel">
      <h2>Recommended Topics 📚</h2>
      {recommendations.map((item) => (
        <RecommendationCard key={item.id} title={item.title} description={item.description} />
      ))}
    </div>
  );
}
