const express = require("express");
const router = express.Router();

/**
 * Local fallback function executed when the OpenRouter service fails or is unreachable.
 * Performs basic keyword analysis to determine sentiment, priority, and a short summary.
 */
function createFallbackResponse(text) {
  const cleanText = text.toLowerCase();
  let sentiment = "neutral";
  let priority = "medium";

  if (
    cleanText.includes("error") ||
    cleanText.includes("broken") ||
    cleanText.includes("crash") ||
    cleanText.includes("bad") ||
    cleanText.includes("terrible") ||
    cleanText.includes("issue")
  ) {
    sentiment = "negative";
    priority = "high";
  } else if (
    cleanText.includes("excellent") ||
    cleanText.includes("great") ||
    cleanText.includes("love") ||
    cleanText.includes("perfect") ||
    cleanText.includes("amazing")
  ) {
    sentiment = "positive";
    priority = "low";
  }

  return {
    sentiment,
    priority,
    summary: "A local fallback response was generated because the AI service was unavailable.",
    dataSource: "local_fallback",
  };
}

router.post("/analyze", async (req, res) => {
  const { textToProcess } = req.body || {};

  // Input Validation: check for missing, null, non-string, empty, or whitespace-only input
  if (typeof textToProcess !== "string" || textToProcess.trim() === "") {
    return res.status(400).json({
      error: "Invalid input: textToProcess must be a non-empty string.",
    });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          {
            role: "user",
            content: `Analyze the following text and return ONLY a valid JSON object with no markdown formatting or extra text, containing:
- "sentiment": "positive", "negative", or "neutral"
- "priority": "low", "medium", or "high"
- "summary": one short sentence summarizing the text

Text: "${textToProcess}"`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`AI service returned status ${response.status}`);
    }

    const data = await response.json();
    const rawContent = data?.choices?.[0]?.message?.content;

    if (!rawContent) {
      throw new Error("Empty response received from AI service.");
    }

    // Strip markdown code blocks (e.g., ```json ... ```) if returned by the model before parsing
    const cleanedJsonString = rawContent.replace(/```json\s*|```/gi, "").trim();
    const parsedResult = JSON.parse(cleanedJsonString);

    return res.json({
      sentiment: parsedResult.sentiment,
      priority: parsedResult.priority,
      summary: parsedResult.summary,
      dataSource: "ai_model",
    });
  } catch (error) {
    console.warn("AI request failed. Activating fallback response:", error.message);
    const fallbackResponse = createFallbackResponse(textToProcess);
    return res.json(fallbackResponse);
  }
});

module.exports = router;
