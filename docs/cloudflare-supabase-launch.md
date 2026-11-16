# Cloudflare + existing Supabase launch checklist

This guide keeps the app on the **existing Supabase project** referenced in `.env.example`. It does not create a second project or migrate data.

## 1. Confirm the existing Supabase project

1. Open the Supabase project dashboard whose URL matches `VITE_SUPABASE_URL` in `.env.example`.
2. In the project's API settings, confirm the project URL and current publishable key. Use the current values from the dashboard if a key has been rotated; do not assume the checked-in example is current forever.
3. Keep the same project URL/key pair for the app's client and Worker runtime.
4. Never expose a `service_role`/secret key in a `VITE_` variable, browser bundle, or Git commit.

## 2. Connect GitHub to Cloudflare Workers

1. In Cloudflare, create a **Workers** project and connect `aiamplifysa-cmyk/k53-master-sa-remixv.02` through Workers Builds.
2. Set the repository root as the project root.
3. Use `npm run build` as the build command. The repo's package script is the source of truth.
4. This is a TanStack Start SSR app, not a static-only Vite site. Do not configure `dist` as its deployment output. The build generates `.output/server/wrangler.json`; `npm run preview` runs Wrangler with that generated config locally.
5. Follow the currently supported TanStack Start/Cloudflare Workers Git deployment instructions for the deploy command. Confirm the Worker runtime and generated Wrangler config are used; Cloudflare product flows can change.
6. Configure a preview deployment first. Do not direct the production domain to it until the checklist below passes.

## 3. Add variables in Cloudflare

Use the existing Supabase project's values from its dashboard and `.env.example`:

| Variable | Cloudflare scope | Purpose |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Build environment | Supabase URL compiled into browser code |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Build environment | Public Supabase key compiled into browser code |
| `SUPABASE_URL` | Worker runtime | Same Supabase project URL for server-side requests |
| `SUPABASE_PUBLISHABLE_KEY` | Worker runtime | Same public key for server-side requests |

Set build and runtime values for both preview and production environments as appropriate. Do not add a service-role key for normal learner sign-in or progress sync. If the protected admin-grant function is to be enabled, configure its service-role key only as a Cloudflare Worker secret, after reviewing the server-side use; never set it as a `VITE_` variable.

## 4. Configure Supabase Auth for the deployed app

In the **same** Supabase project:

1. Set the Auth Site URL to the intended production origin when ready.
2. Add the exact Cloudflare preview and production origins and required auth callback paths to the allowed redirect URL list. Include the `/reset-password` redirect used by the app. Avoid broad wildcard redirects where exact URLs work.
3. Verify email delivery and the signup-confirmation and password-reset templates.
4. The app's admin email-code flow expects the email template to contain `{{ .Token }}`. Verify this before relying on admin OTP sign-in.
5. Configure Google OAuth only if the Google button is intended to be available. Verify the provider's callback URL and Supabase redirect allowlist for the deployed domain.
6. The Lovable OAuth button depends on Lovable's auth service/configuration. Test it on the preview; hide or remove it in a reviewed code change if it is not supported for the Cloudflare deployment.

## 5. Verify the Cloudflare preview

Use a dedicated test learner account; do not test by sharing credentials. Check:

- The Worker build and deployment complete, and direct navigation/reload works on app routes.
- `/`, `/learn`, `/signs`, `/practice`, `/mock-test`, `/review`, `/auth`, `/reset-password`, `/dltc`, `/practical`, `/about`, and `/admin` load as intended.
- All primary navigation and visible CTAs go to their intended destinations.
- Sign up, email confirmation, sign in, sign out, and password reset work end to end.
- OAuth providers that remain enabled return to the app and establish a session.
- A test learner can create/update a profile and sync progress to the existing Supabase project; progress persists after reload and sign-in on another browser/device.
- Sign-chart sheets load from `/assets/charts/road-sign-sheet-1.webp` through `road-sign-sheet-4.webp`; sample sign crops and question images match their displayed codes and descriptions. Automated mapping tests do not replace visual inspection.
- Each resource link on `/dltc` opens its intended PDF.
- Mobile and desktop layouts are usable. Verify offline restart only after publishing, because the local preview intentionally disables offline caching.

## 6. Run checks and promote

Before production:

```sh
npm run test
npm run lint
npm run build
```

Fix failures before release. Promote only after preview auth, sync, navigation, and image checks pass. Set the production origin in the Supabase redirect allowlist before the final production auth test.

## Known items requiring publisher/deployment access

The repository roadmap still notes that live Supabase profile/progress sync and published offline restart need verification. The legal page also contains publisher-provided contact placeholders for the verified support email and CIPC registration number; replace them with confirmed details before public launch. The sign catalogue audit is not a claim of completeness; consult authoritative catalogue sources before making such a claim.
