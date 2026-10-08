# Brooklyn College Undergraduate Admissions Assistant

A responsive Bulldog-branded admissions guide for Brooklyn College undergraduate applicants. It combines source-linked answers adapted from the supplied admissions inquiry templates with a conversational AI assistant, a workflow map, and optional consent-based conversation storage.

This is an independent prototype, not an official Brooklyn College service. It cannot access CUNYfirst, view application records, decide eligibility, submit applications, or act on a student’s behalf. Verify deadlines and personal application questions with the College.

## Features

- Answers common first-year, transfer, international, financial-aid, deposit, and enrollment questions with links to official College pages.
- Understands free-form questions, typos, paraphrases, and follow-up context using the OpenAI Responses API when configured; otherwise the curated FAQ matcher remains available.
- Shows how messages are routed, sourced, answered, referred, and optionally stored.
- Stores chat text in PostgreSQL only after a visitor opts in. It does not ask for names, email addresses, credentials, or student records. Visitors are asked not to include personal details. Conversation records older than 30 days are removed when a later opted-in turn is saved.

## Run locally

Requires Node.js 22 or newer.

~~~sh
npm ci
npm run build
npm run dev
~~~

Open http://localhost:4173. Without `OPENAI_API_KEY`, the app uses the curated FAQ. Local FAQ mode works without a database; transcript storage requires `DATABASE_URL` pointing to PostgreSQL.

Copy `.env.example` to `.env.local` and set the values you need. Never commit secrets. The AI request uses `store:false`; this is not a promise of zero retention by the AI provider.

## Deploy on Render

The repository includes `render.yaml` for a Render Blueprint. It defines a Node web service and a PostgreSQL database, builds the static bundle, and starts the app on Render’s `PORT`. During Blueprint setup, enter `OPENAI_API_KEY` as a secret in Render to enable conversational answers; without it, the FAQ remains usable.

The Blueprint currently uses Render’s free plans for a preview. Free web services may sleep when idle, and free Postgres databases expire 30 days after creation. Upgrade the database before that date if you need to retain conversation data; do not use this free database for production records. See Render’s [free instance limits](https://render.com/docs/free).

## GitHub

Create a repository named `brooklyn-admissions-assistant` and push this project’s `main` branch. Keep the repository private if you do not want the source public. In Render, connect that repository and deploy the `render.yaml` Blueprint. Render can then rebuild the app from repository changes.

## Build and checks

~~~sh
npm run build
npm test
~~~

Tests cover representative question matching, AI request validation, citation filtering, Worker routes, consent-gated inserts, origin checks, and cleanup using mocked services. The Render service uses the same static UI and chat handler with a Node HTTP server and PostgreSQL; the Worker build remains for the earlier Cloudflare setup.

## Project layout

- `public/` — user interface, source knowledge, styles, and image assets.
- `server/` — Node HTTP server, AI chat handler, and PostgreSQL persistence.
- `worker/index.js` — legacy Cloudflare Worker and D1 routes.
- `drizzle/` — legacy D1 schema migration.
- `render.yaml` — Render web service and Postgres Blueprint.
- `scripts/` — build, asset, and project checks.

Admissions content is adapted from the supplied 2020 ADMISSIONS INQUIRY TEMPLATES.docx. Procedures and time-sensitive requirements should be verified against current College pages before a public launch. See `CONTENT_REVIEW.md` and `CAMPUS_ARTWORK.md` for content and visual notes.
