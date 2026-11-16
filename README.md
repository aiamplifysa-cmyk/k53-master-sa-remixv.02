# K53 Master SA

A South African K53 learner-test study app with category lessons, a road-sign library, practice questions, mock tests, and local study progress. Learners can optionally sign in to synchronize selected progress across devices.

## Run locally

Requirements: Node.js and npm.

```sh
git clone https://github.com/aiamplifysa-cmyk/k53-master-sa-remixv.02.git
cd k53-master-sa-remixv.02
npm install
cp .env.example .env
npm run dev
```

The local environment file must contain the Supabase URL and publishable key shown in `.env.example`. The publishable key is intended for client use; never put a Supabase service-role key in browser code or commit secrets to Git.

## Verify before deployment

```sh
npm run test
npm run lint
npm run build
```

## Deploying to Cloudflare Workers

This is a TanStack Start application with server rendering. Deploy it as a Worker, not as a static-only `dist` site. Connect this repository to Cloudflare Workers Builds and use the build script `npm run build`. The production build generates `.output/server/wrangler.json`; the local preview script uses that generated Worker configuration:

```sh
npm run preview
```

For the exact Git-integrated deploy command and settings, follow the current TanStack Start Cloudflare Workers deployment instructions and Cloudflare dashboard prompts. Start with a preview deployment and complete the checklist in [`docs/cloudflare-supabase-launch.md`](docs/cloudflare-supabase-launch.md) before promoting it to production.

## Supabase

The app is already wired to the Supabase project identified by `.env.example`. To keep using that same project, set the build-time and Worker runtime variables from that project in Cloudflare; do not create a replacement project unless you intentionally want to migrate data and auth. Auth redirect URLs must include the Cloudflare preview and production domains. See the launch guide for the full setup and live verification steps.

## Lovable

This repository is also connected to Lovable. Normal commits to the connected branch synchronize back to the Lovable editor. Avoid rewriting published Git history.
