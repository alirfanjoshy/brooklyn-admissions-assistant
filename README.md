# Brooklyn Admissions Assistant

Responsive, buildless admissions assistant prototype. Open `dist/index.html` or serve `dist/` with a static HTTP server.

## Features
- Responsive maroon-and-cream interface with original SVG campus illustration
- Source-linked curated admissions answers, suggested follow-ups, resource library
- Saved answers in local browser storage; copying and new conversations
- Keyboard-accessible chat input and mobile navigation

## Content and limitations
The current chat is a **curated FAQ matcher, not generative AI**. It cannot access applications, determine eligibility, make admissions decisions, or schedule appointments. Source links are official Brooklyn College pages reviewed October 6, 2026. Recheck admissions policies before a public rollout. The supplied 2020 ADMISSIONS INQUIRY TEMPLATES.docx was incorporated on October 6, 2026. The app now contains 32 topics, including 24 new template-based topics. Legacy figures and procedures are updated where verified, or explicitly referred to Admissions for confirmation.

Edit the base `knowledge` array in `dist/app.js` or the template entries in `scripts/add-template-content.py` (then run it to regenerate `dist/template-knowledge.js`). Matching priority lives in `dist/matcher.js`. User input is rendered with textContent, never interpreted as HTML. Messages are not persisted; only saved topic IDs are stored in localStorage.

## Live AI integration
Enable the OpenAI Developers plugin to provision an API key through its approved workflow. Add a server-side chat endpoint with secret storage, approved source retrieval, citations, request limits, and clear uncertainty handling. Never place API keys in browser code. This static preview does not include an AI backend.

## Verification
`node --check dist/app.js`

`node scripts/check-answers.cjs` — 38 representative questions, unique topic IDs, source URLs, and checks against inappropriate staff-action claims.

## Bulldog chat and Time Clock theme

The UI now matches the BC Time Clock app’s dark sidebar, gray workspace, white cards, maroon buttons, and gold accents. `dist/mascot.css` contains the theme and page-pushing animation; `dist/mascot.js` controls the native dialog, focus restoration, conversation reset, and searchable in-chat topics. The bulldog head asset is reused from the user’s BC Time Clock app at `/loading/bulldog-face.png`; its animated body is CSS. Reduced-motion preferences disable the entrance animation.

Browser checked: launcher, completed entrance, suggested answer, Escape dismissal/focus restoration, reopening with retained conversation, reset, and 390px mobile chat layout.

## Conversational AI backend (prepared, activation pending)

`npm run dev` now uses Node 24 and serves the site plus `/api/chat` and `/api/chat/status` from `server/dev.mjs`. The AI handler uses the OpenAI Responses API with `gpt-4.1-mini` by default (configurable via OPENAI_MODEL), all 32 knowledge entries, and up to 16 recent messages. It supports natural phrasing and follow-ups when connected. Keys stay server-side. API storage is disabled with store:false; this is not a claim of zero provider retention.

Install the OpenAI Developers plugin to provision the key using its approved workflow. Local configuration is read from ignored `.env.local`; only variable names are committed in `.env.example`. Never paste credentials into chat or browser files. Restart after configuring a key.

Without a key, the status endpoint reports FAQ mode and the UI keeps its template-preview label. API errors are shown with a retry button, not silently presented as AI answers. Topic-library clicks remain source-linked prepared answers, available even without AI.

Validation: `node scripts/check-ai.mjs` checks conversation context forwarding, server-owned source URLs, input validation, and error behavior with a mock API. No live AI request has been verified. `node scripts/check-answers.cjs` checks existing FAQs.

The published Sites version is still static. Hosting activation requires a server-capable Sites build and its OPENAI_API_KEY runtime secret; the Node development server is for local use, not the Cloudflare Worker runtime. The current public/static build must not be described as live AI until migration, secret configuration, and end-to-end checks complete.

## Refined visual design

`dist/refined.css` is the current visual layer: warm neutral surfaces, editorial serif headings, consistent line icons, simplified cards, and a compact maroon chat launcher. The large CSS bulldog body has been removed from the markup. Chat opens in a rounded floating panel with a brief fade/vertical transition; it no longer pushes the page. Reduced-motion settings disable the transition. Desktop and 390px mobile chat layouts and topic replies were checked in the browser.
