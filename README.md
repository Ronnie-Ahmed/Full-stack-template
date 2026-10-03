# Fullstack Template — Next.js + Node.js (Express) + MongoDB

```
apps/
  api/   Express + TypeScript + Mongoose (JWT auth in httpOnly cookie)
  web/   Next.js 14 (App Router) + TypeScript
docker-compose.yml   mongo + api + web
.github/workflows    CI (typecheck, test, build)
```

## Quick start (local dev)

```bash
npm run install:all
cp apps/api/.env.example apps/api/.env       # set JWT_SECRET (32+ chars)
cp apps/web/.env.example apps/web/.env.local
docker run -d -p 27017:27017 --name mongo mongo:7   # or use Atlas
npm run dev:api     # http://localhost:4000/api/v1/health
npm run dev:web     # http://localhost:3000
```

## Docker (everything)

```bash
npm run install:all          # generates the package-lock.json files used by `npm ci`
cp .env.example .env         # edit secrets
npm run docker:up
```

## API

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | /api/v1/health | – | health + DB status |
| POST | /api/v1/auth/register | – | create account, sets cookie |
| POST | /api/v1/auth/login | – | log in, sets cookie |
| POST | /api/v1/auth/logout | – | clears cookie |
| GET | /api/v1/users/me | cookie / Bearer | current user |

Add a feature by creating `modules/<name>/{model,schema,service,controller,routes}.ts` and mounting it in `routes/index.ts`.

## Production notes

- **Cookies across domains:** the auth cookie is `httpOnly`, `secure` in production, `SameSite=Lax`. Serve web and API under the same site (e.g. `app.example.com` + `api.example.com`, or one domain with a reverse proxy routing `/api`). For different sites you need `SameSite=None; Secure` plus CSRF protection.
- **Secrets:** never commit `.env`; use your platform's secret store. Rotating `JWT_SECRET` logs everyone out.
- **MongoDB:** use Atlas or a replica set in production, enable backups, manage indexes deliberately.
- **TLS / proxy:** terminate TLS at a proxy (Nginx, Caddy, cloud LB). `trust proxy` is already set to 1.
- **Observability:** logs are structured JSON (pino); ship them to your log platform. Add Sentry/OpenTelemetry as needed.
- **Worth adding next:** ESLint/Prettier + husky, refresh tokens, email verification, integration tests with `mongodb-memory-server`, OpenAPI docs.
