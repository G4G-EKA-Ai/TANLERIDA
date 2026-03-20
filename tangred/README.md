# Tangred

Tangred is a premium Indian leather commerce application built with Next.js App Router, TypeScript, Prisma, Auth.js, Zustand, and a Tan Leida AI styling workflow.

## Architecture

- `app/` — App Router pages and API routes
- `auth.ts` — Auth.js v5 root configuration
- `components/` — storefront, layout, cart, and Tan Leida UI
- `lib/` — provider wrappers, orchestration, formatting, auth, runtime state helpers
- `prisma/` — schema and seed data

## Key conventions

- All money is stored as integer paise.
- Tan Leida session creation, photo upload, profile capture, preferences, and analysis are separated into discrete routes.
- Provider wrappers (Gemini, Anthropic, Cloudinary, Razorpay, Resend) degrade safely when credentials are missing in development.
- Prisma generation is configured via `prisma.config.ts` and `postinstall`.

## Useful commands

```bash
npm run dev
npm run lint
npm run build
npx prisma generate
npm run db:seed
```
