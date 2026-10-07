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
