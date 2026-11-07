// Token Dataset: "React", "Manages", "State"
// Each token contains 4-dimensional Query, Key, and Value vector arrays
const textSequence = [
  {
    word: "React",
    query: [0.9, 0.1, 0.05, 0.0],
    key: [0.85, 0.15, 0.0, 0.05],
    value: [100, 5, 0, 0],
  },
  {
    word: "Manages",
    query: [0.2, 0.8, 0.1, 0.1],
    key: [0.15, 0.75, 0.2, 0.0],
    value: [10, 50, 10, 0],
  },
  {
    word: "State",
    query: [0.85, 0.3, 0.0, 0.4],
    key: [0.9, 0.2, 0.1, 0.3],
    value: [0, 10, 80, 5],
  },
];

// Target token evaluating context parameters: We are analyzing the word "State"
const focusTokenIndex = 2;

/* Expected Verification Output:
- Word: "React" | Raw: 0.7875 | Scaled: 0.3938
- Word: "Manages" | Raw: 0.3525 | Scaled: 0.1763
- Word: "State" | Raw: 0.9450 | Scaled: 0.4725
*/

// Step 1: Utility function to compute the dot product of two vectors
function calculateDotProduct(vectorA, vectorB) {
  let product = 0;
  for (let i = 0; i < vectorA.length; i++) {
    product += vectorA[i] * vectorB[i];
  }
  return product;
}

// Step 2: Extract the Query vector of the focus token ("State")
const targetQuery = textSequence[focusTokenIndex].query;

// Step 3: Loop over textSequence using .map() to calculate raw and scaled scores
const attentionScores = textSequence.map((token) => {
  const raw = calculateDotProduct(targetQuery, token.key);
  const scaled = raw / 2;

  return {
    word: token.word,
    rawScore: raw,
    scaledScore: scaled,
  };
});

// Step 4: Output the results to the terminal
console.log("Calculated Attention Scores:");
console.log(attentionScores);
