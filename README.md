# Brooklyn College Undergraduate Admissions Assistant

A responsive, Bulldog-branded guide to undergraduate admissions at Brooklyn College. The app combines 32 source-linked answers adapted from the supplied admissions inquiry templates with a natural-language AI assistant when an OpenAI API key is configured. Its “How it works” view maps the question-routing, answer, referral, and optional data-storage steps.

This is an independent prototype, not an official Brooklyn College service. It cannot access CUNYfirst, view application records, decide eligibility, submit applications, or act on a student’s behalf. Verify deadlines and personal application questions with the College.

## What it does

- Answers common first-year, transfer, international, financial-aid, deposit, and enrollment questions, with links to official College pages.
- Understands free-form questions and conversation context through the OpenAI Responses API when configured; otherwise, it uses the curated, source-linked FAQ matcher.
- Shows a workflow map that explains routing, source checks, AI/FAQ fallback, referrals, and consent-controlled transcript storage.
- Provides searchable admissions topics, saved answers in the visitor’s browser, and a responsive Bulldog chat panel.
- Stores chat text in a hosted D1 database only after a visitor opts in. It saves what they type and the assistant’s response under a random conversation ID; the app does not ask for names, email addresses, IP addresses, account credentials, or student records. If a visitor includes personal details in their text, those details would be saved too, so the consent notice tells them not to. Records older than 30 days are removed when a later opted-in turn is saved; they can remain longer if the app is idle.

## Run locally

Requires Node.js 24 or newer. There are no npm dependencies.

~~~sh
npm run dev
~~~

Open http://localhost:4173. Without OPENAI_API_KEY, the local app uses the curated FAQ. Local preview does not save conversations to D1; the database is provisioned by the hosted Sites deployment.

To enable conversational AI locally, place secrets in the ignored .env.local file:

~~~dotenv
OPENAI_API_KEY=your-key
OPENAI_MODEL=gpt-4.1-mini
~~~

Restart the dev server after changing the file. Never place credentials in browser code, Git, or this README. The API request uses store:false; this is not a promise of zero retention by the AI provider.

## Build and checks

~~~sh
npm run build
npm test
~~~

The build creates a self-contained Cloudflare Worker under dist/server/, bundling the static UI, 32 reviewed knowledge topics, and the chat handler. It also includes the database migration and Sites manifest. Tests cover representative question matching, AI request validation, answer-source filtering, worker routes, consent-gated inserts, origin checks, and retention cleanup. They use a mock AI response and mock D1 binding; no live AI request is made.

## Database

The hosted Site uses its D1 binding DB. The initial migration is drizzle/0001_consent_based_conversations.sql and creates:

- conversations: random ID and consent/creation/activity timestamps.
- conversation_messages: user/assistant text, source topic ID, and timestamp, linked to its conversation.

The Worker rejects writes without explicit consent, same-origin checks, valid conversation IDs, and bounded message sizes. It does not expose a transcript-reading route to visitors. The Site owner can inspect the hosted database through the Sites database tools. Do not use this prototype to collect sensitive admissions information.

## Hosting

The app is connected to a private OpenAI Sites deployment at:

<https://brooklyn-admissions-assistant.joshy01.chatgpt.site>

.openai/hosting.json identifies that Site and its D1 binding. Publishing a Worker build applies the schema migration and deploys the app. The existing Site audience is owner-only; change its access policy to public before sharing with students.

Set OPENAI_API_KEY as a secret in the Site runtime environment to enable AI answers; optionally set OPENAI_MODEL. Deploy the saved version after updating environment variables. Keep secrets out of source control.

## GitHub

The intended repository name is brooklyn-admissions-assistant. Create it as private unless you deliberately want the source to be public, then connect this working tree and push main:

~~~sh
gh repo create brooklyn-admissions-assistant --private --source . --remote origin --push
~~~

The GitHub app connected to this workspace can list and read repositories but does not provide repository creation. If gh is unavailable, sign in to GitHub in a browser and create the empty repository, then add it as origin and push.

## Project layout

- public/ — app UI, knowledge bundle, styles, and image assets used in local preview and Worker builds.
- worker/index.js — Worker routing, D1 persistence, consent validation, and response throttling.
- server/chat.mjs — prompt rules, allowlisted source citations, and OpenAI API integration.
- server/dev.mjs — local Node preview server.
- drizzle/ — hosted D1 schema migration.
- scripts/build-worker.mjs — bundles the site and chat handler for Sites.
- scripts/check-answers.cjs, scripts/check-ai.mjs, scripts/check-worker.mjs — project checks.

## Admissions content

The admissions content is adapted from the supplied 2020 ADMISSIONS INQUIRY TEMPLATES.docx. Procedures and time-sensitive requirements should be verified against current College pages before a public launch. See CONTENT_REVIEW.md for review notes and CAMPUS_ARTWORK.md for the campus illustration background.
