// 1. Base Data Catalog & Target Vector

// Mock 4-Dimensional Embeddings tracking: [FrontEnd, BackEnd, Mobile, DataScience]
const articleRegistry = [
  {
    title: "Mastering React State Hooks",
    embedding: [0.95, 0.1, 0.2, 0.05],
  },
  {
    title: "Building Microservices with Node and Express",
    embedding: [0.15, 0.9, 0.1, 0.3],
  },
  {
    title: "Flutter vs React Native for iOS and Android",
    embedding: [0.4, 0.2, 0.95, 0.05],
  },
  {
    title: "Pandas and NumPy Data Analysis Workflows",
    embedding: [0.05, 0.4, 0.05, 0.9],
  },
];

// Target user preference profile vector:
// Heavily focused on server-side architecture and data parsing
const targetUserVector = [0.1, 0.85, 0.0, 0.6];

// 2. Distance and Sorting Logic

/**
 * Calculates the Euclidean distance between two numerical vectors of identical length.
 * Formula: sqrt(sum((vecA[i] - vecB[i])^2))
 *
 * @param {number[]} vecA - First vector
 * @param {number[]} vecB - Second vector
 * @returns {number} The straight-line Euclidean distance
 */
function getEuclideanDistance(vecA, vecB) {
  let sumOfSquaredDifferences = 0;

  for (let i = 0; i < vecA.length; i++) {
    const difference = vecA[i] - vecB[i];
    sumOfSquaredDifferences += Math.pow(difference, 2);
  }

  return Math.sqrt(sumOfSquaredDifferences);
}

// Map over the registry to compute and append the distance to targetUserVector
const articlesWithDistance = articleRegistry.map((article) => {
  return {
    ...article,
    distance: getEuclideanDistance(article.embedding, targetUserVector),
  };
});

// Sort ascending so the lowest distance (strongest similarity) sits at index 0
articlesWithDistance.sort((a, b) => a.distance - b.distance);

// Isolate the optimal semantic match (index 0)
const bestMatch = articlesWithDistance[0];

// Output the results to the terminal
console.log("=== Most Optimal Semantic Match ===");
console.log(`Title:    ${bestMatch.title}`);
console.log(`Distance: ${bestMatch.distance.toFixed(4)}`);
