# Brooklyn Admissions Assistant

Responsive, buildless admissions assistant prototype. Open `dist/index.html` or serve `dist/` with a static HTTP server.

## Features
- Responsive maroon-and-cream interface with original SVG campus illustration
- Source-linked curated admissions answers, suggested follow-ups, resource library
- Saved answers in local browser storage; copying and new conversations
- Keyboard-accessible chat input and mobile navigation

## Content and limitations
The current chat is a **curated FAQ matcher, not generative AI**. It cannot access applications, determine eligibility, make admissions decisions, or schedule appointments. Source links are official Brooklyn College pages reviewed October 6, 2026. Recheck admissions policies before a public rollout. No user-provided template was available during implementation.

Edit the `knowledge` array in `dist/app.js` to add approved questions and answers. User input is rendered with textContent, never interpreted as HTML. Messages are not persisted; only saved topic IDs are stored in localStorage.

## Live AI integration
Enable the OpenAI Developers plugin to provision an API key through its approved workflow. Add a server-side chat endpoint with secret storage, approved source retrieval, citations, request limits, and clear uncertainty handling. Never place API keys in browser code. This static preview does not include an AI backend.

## Verification
`node --check dist/app.js`
