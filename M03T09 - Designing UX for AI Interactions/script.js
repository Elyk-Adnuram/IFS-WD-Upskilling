// Sample simulated study tips by keyword/general fallback
const sampleTips = [
  "Break your topic into 25-minute study sessions using the Pomodoro Technique.",
  "Try explaining this concept to a friend or out loud to test your understanding.",
  "Create a visual mind map connecting the core concepts of this topic.",
  "Write down 3 key questions about this topic and answer them without looking at your notes."
];

// DOM Elements
const topicInput = document.getElementById("topic-input");
const generateBtn = document.getElementById("generate-btn");
const retryBtn = document.getElementById("retry-btn");
const statusMessage = document.getElementById("status-message");
const responseContainer = document.getElementById("response-container");

/**
 * Handles generating simulated AI responses with success and failure states.
 */
async function generateStudyTip() {
  const topic = topicInput.value.trim();

  // Validate user input before starting
  if (!topic) {
    statusMessage.textContent = "Please enter a study topic first.";
    statusMessage.className = "status-message error";
    return;
  }

  // 1. Set Loading State UX
  generateBtn.disabled = true;
  generateBtn.textContent = "Generating Tip...";
  retryBtn.classList.add("hidden");
  responseContainer.classList.add("hidden");
  responseContainer.textContent = "";

  statusMessage.textContent = "AI is generating your personalized study tip...";
  statusMessage.className = "status-message";

  try {
    // 2. Simulate API delay (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 3. Simulate failure state (30% chance of error)
    const isFailure = Math.random() < 0.3;
    if (isFailure) {
      throw new Error("Simulated API failure");
    }

    // 4. Handle Success State
    const randomTip = sampleTips[Math.floor(Math.random() * sampleTips.length)];
    responseContainer.textContent = `💡 Study Tip for "${topic}": ${randomTip}`;
    responseContainer.classList.remove("hidden");

    statusMessage.textContent = "Study tip generated successfully!";
    statusMessage.className = "status-message success";

  } catch (error) {
    // 5. Handle Failure State & Recovery UX
    statusMessage.textContent = "The AI service is temporarily unavailable. Please try again.";
    statusMessage.className = "status-message error";
    retryBtn.classList.remove("hidden");

  } finally {
    // 6. Reset Primary Action Control
    generateBtn.disabled = false;
    generateBtn.textContent = "Generate Tip";
  }
}

// Event Listeners
generateBtn.addEventListener("click", generateStudyTip);
retryBtn.addEventListener("click", generateStudyTip);