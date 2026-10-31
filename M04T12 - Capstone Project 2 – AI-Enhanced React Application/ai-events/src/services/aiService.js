const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const MODEL = import.meta.env.VITE_OPENROUTER_MODEL ||
    'meta-llama/llama-3.3-70b-instruct:free';

export const AI_KINDS = {
  description: 'Generate description',
  tasks: 'Suggest preparation tasks',
};

function describeEvent({name, date, time, location, description}) {
  return [
    `Event name: ${name}`,
    date && `Date: ${date}`,
    time && `Time: ${time}`,
    location && `Location: ${location}`,
    description && `Current notes: ${description}`,
  ].filter(Boolean).join('\n');
}

function buildPrompt(kind, details) {
  const task = kind === 'tasks' ?
    'List 4-6 short preparation tasks as a plain "- " bullet list.' :
    'Write a friendly event description of 2-3 sentences.';
  return `${task} Plain text only, no markdown headings.\n\n` +
      describeEvent(details);
}

function wait(ms, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
}

async function simulate(kind, details, signal) {
  await wait(1400, signal);
  const place = details.location ? ` at ${details.location}` : '';
  if (kind === 'tasks') {
    return [
      `- Confirm the time and attendees for "${details.name}"`,
      '- Prepare any materials or notes needed',
      `- Plan travel and arrival time${place}`,
      '- Set a reminder the day before',
      '- Send a short follow-up afterwards',
    ].join('\n');
  }
  return `Join us for ${details.name}${place}. This session is a chance to ` +
      'connect, share ideas, and make progress together. Please arrive a few ' +
      'minutes early so we can start on time.';
}

/**
 * Generates text for an event. Uses OpenRouter when a key is configured,
 * otherwise a simulated response. Resolves to {text, simulated}.
 */
export async function generateEventText(kind, details, signal) {
  if (!API_KEY) {
    return {text: await simulate(kind, details, signal), simulated: true};
  }
  const response = await fetch(API_URL, {
    method: 'POST',
    signal,
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'X-Title': 'Personal Event Planner',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{role: 'user', content: buildPrompt(kind, details)}],
    }),
  });
  if (!response.ok) {
    throw new Error(`The AI service returned an error (${response.status}).`);
  }
  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error('The AI service returned an empty response.');
  return {text, simulated: false};
}
