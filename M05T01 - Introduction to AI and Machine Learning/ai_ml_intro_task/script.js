document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("recommender-form");
  const resultContainer = document.getElementById("result-container");
  const recommendationTitle = document.getElementById("recommendation-title");
  const recommendationReason = document.getElementById("recommendation-reason");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Parse input values
    const quizScore = parseFloat(document.getElementById("quiz-score").value);
    const confidence = document.getElementById("confidence-level").value;
    const pace = document.getElementById("learning-pace").value;

    let path = "";
    let reason = "";

    // Recommendation logic evaluating 3 paths: Foundation Review, Guided Practice, Advanced Challenge
    if (quizScore < 60 || confidence === "low") {
      path = "Foundation Review";
      reason = `Recommended based on your quiz score (${quizScore}/100) or low confidence rating. This path focuses on reinforcing core terminology, syntax basics, and key principles before moving on to complex applications.`;
    } else if (
      (quizScore >= 80 && (confidence === "high" || pace === "accelerated")) ||
      (quizScore >= 85 && confidence === "medium" && pace === "accelerated")
    ) {
      path = "Advanced Challenge";
      reason = `Recommended based on your strong quiz performance (${quizScore}/100), combined with high confidence or an accelerated pace preference. This path covers building custom pipelines, API error handling, and performance optimization.`;
    } else {
      path = "Guided Practice";
      reason = `Recommended as an optimal balance for your score (${quizScore}/100), confidence level (${confidence}), and learning pace (${pace}). This path provides structured step-by-step exercises and practical code walkthroughs.`;
    }

    // Render results
    recommendationTitle.textContent = `Recommended Path: ${path}`;
    recommendationReason.textContent = reason;
    resultContainer.classList.remove("hidden");
  });
});
