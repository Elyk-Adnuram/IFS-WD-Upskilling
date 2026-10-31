# Personal Event Planner

A React + Vite web app for scheduling and tracking personal or professional
events, with an AI-powered event assistant.

## Purpose

Register, log in, and manage events (name, date, time, location, description)
from a dashboard. Edit or delete events at any time. A built-in Help page
explains every feature.

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

Open the URL printed in the terminal (usually http://localhost:5173).

## AI feature

The **AI event assistant** lives inside the event form. From the event name
(and any details entered) it can:

- **Generate a description**
- **Suggest preparation tasks**

The result appears in an editable draft panel, labeled as AI-generated, with a
review notice. Nothing changes in the event until the user clicks
**Add to description**. The draft can be edited, regenerated, or discarded.
The panel also shows a loading state and an error message with a retry button.

### AI service

- **OpenRouter** (`https://openrouter.ai/api/v1/chat/completions`) via `fetch()`.
- To enable it, copy `.env.example` to `.env` and set `VITE_OPENROUTER_API_KEY`.
  Optionally change `VITE_OPENROUTER_MODEL` to any free model.
- **No key?** The app falls back to a simulated assistant (delayed, templated
  responses) so loading, error and review flows still work. Simulated output is
  labeled as such.

### Known limitations

- AI output can be inaccurate or generic and must be reviewed.
- Free models may be rate-limited, slow, or temporarily unavailable.
- A `VITE_` API key is bundled into client code. This is acceptable for a
  portfolio demo; use a backend proxy in production.
- The simulated assistant gives templated text, not real AI output.

## Data and security note

This is a front-end-only project. Accounts and events are stored in the
browser's `localStorage` (passwords are SHA-256 hashed). Use a real backend
for production.

## Project structure

```
src/
  components/  Header, ProtectedRoute, EventForm, EventCard, AIAssistant
  context/     AuthContext, EventContext, AIContext
  pages/       Register, Login, Dashboard, EventEditor, Help, NotFound
  services/    aiService (OpenRouter + simulated fallback)
  utils/       validation, storage
  styles/      global stylesheet
```
