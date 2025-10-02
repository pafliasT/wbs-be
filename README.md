# wbs-be — WBS & Timesheet API

Backend for tracking **WBS projects** and (soon) **timesheet/overtime** entries.

- **Stack:** NestJS 11 · Prisma · PostgreSQL (Neon)
- **Local Dev:** connects directly to Neon (development branch)
- **Planned Deploy:** Render (API) + Neon (DB). FE will be Next.js on Vercel (separate repo).

---

## Quick Start

```bash
git clone <repo-url>
cd wbs-be

# 1) Env
cp .env.example .env   # paste your Neon *development branch* connection string

# 2) Install & DB
npm ci
npx prisma migrate dev
npx prisma db seed     # optional: inserts two demo projects

# 3) Run
npm run start:dev
# -> http://localhost:3000/projects
```
**Endpoint (v1):**
```
GET /projects
```

**Sample response:**
```json
[
  {
    "id": "cmg9hzfic0000iap0pv56zogz",
    "code": "WBS-1001",
    "name": "Internal Tools",
    "createdAt": "2025-10-02T14:15:29.601Z",
    "updatedAt": "2025-10-02T14:15:29.601Z"
  }
]
```

---

## Environment

Create `.env` from the example and set your Neon URL:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require&channel_binding=require"
```

> Keep `.env` out of Git; commit only `.env.example`.

---

## Scripts

```bash
# install deps
npm ci

# run in watch mode
npm run start:dev

# build / prod
npm run build
npm run start:prod

# prisma
npx prisma generate
npx prisma migrate dev
npx prisma db seed

# lint & format
npm run lint -- --fix
npm run format
```

---

## Database & ORM

- **Prisma schema:** `prisma/schema.prisma`
- **Initial model:**
```prisma
model Project {
  id        String   @id @default(cuid())
  code      String   @unique
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```
- **Seed:** `prisma/seed.ts` inserts two demo projects.

---

## Code Structure

```
src/
  app.module.ts
  main.ts
  prisma/
    prisma.module.ts
    prisma.service.ts
  projects/
    projects.module.ts
    projects.controller.ts   # GET /projects
    projects.service.ts      # uses PrismaClient
```

Notes:
- Prisma lifecycle handled via `onModuleInit` / `onModuleDestroy` (no `$on('beforeExit')` hook).
- ESLint/Prettier configured; line endings normalized via `.gitattributes`.

---

## Collaboration

- Default branch: `main`
- Feature branches: `feat/<topic>` (e.g., `feat/timesheets-get`)
- Before PR: `npm run lint -- --fix && npm run format`

---

## Roadmap (next steps)

1. Add `TimesheetEntry` model (date, hours, type, projectId, note).
2. Expose `GET /timesheets`.
3. Add `POST /projects` with DTO + validation.
4. Auth (JWT or FE session).
5. Deploy BE to Render (point to Neon production branch).

---

## Deployment (planned)

- **API:** Render (Free) — Node service with `npm run start:prod`
- **DB:** Neon (production branch). Run `prisma migrate deploy` on release.

Deployment files/steps will be added when we reach the deploy milestone.

---

## License

**UNLICENSED** — internal use only (matches `package.json`).

