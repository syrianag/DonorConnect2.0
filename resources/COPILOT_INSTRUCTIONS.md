# Copilot Instructions — DonorConnect

Purpose: Provide actionable setup, development workflow, prioritized tasks, AI prompt templates, and checklists to implement the DonorConnect MVP quickly.

---

**Goal (MVP)**
- Implement core API endpoints, DB models, RBAC staff auth, and a minimal Next.js UI for: recent donors, top donations, active campaigns.

**Quick Setup (Windows / WSL)**
- Install dependencies:

```bash
npm install
```

- Copy example env (PowerShell):

```powershell
Copy-Item .env.example .env.local
```

- Dev server:

```bash
npm run dev
```

- Build & start:

```bash
npm run build
npm start
```

- Useful: use WSL for POSIX-style commands if preferred.

---

**Key paths to focus on**
- `pages/api/` — API routes
- `pages/` — Next.js pages (dashboard, donors, campaigns)
- `components/` — UI components
- `lib/` — DB client, auth helpers, config
- `.env.local` — environment secrets and DB connection
- `README.md`, `BUILD.md` — specs and phase guidance

---

**High-level MVP task list (priority)**
1. Data models: `donors`, `donations`, `campaigns`, `staff_users` (with role field)
2. API endpoints (initially stubbed):
   - `GET /api/donors/recent`
   - `GET /api/donations/top`
   - `GET /api/campaigns/active`
   Response shapes must match `README.md`.
3. Basic auth/RBAC: staff login + session or JWT protecting API routes
4. Minimal UI pages that fetch and render the three endpoints
5. Local persistence: SQLite for dev (Prisma recommended), Postgres for production

---

**Suggested incremental implementation steps**
- Step A: Add DB client under `lib/db.js` (Prisma/SQLite). Create schema for the four entities and run initial migration.
- Step B: Create API route stubs that return example JSON matching README; commit and run dev server.
- Step C: Build simple frontend pages to fetch the endpoints and display lists/cards.
- Step D: Replace API stubs with real DB queries, add validation and error handling.
- Step E: Add auth: login page, server session, middleware for protected API routes.
- Step F: Add tests for API shapes and key UI components.

---

**Branching & PR workflow**
- Branches: `feature/<short-desc>`, `fix/<issue>`, `chore/<task>`
- Keep PRs small and focused (one endpoint or page per PR)
- PR template (minimum): summary, related BUILD.md step, testing steps, migration notes (if any), screenshots

**PR checklist**
- [ ] `npm run lint` passes
- [ ] `npm test` passes
- [ ] `npm run build` succeeds
- [ ] Migrations included or documented
- [ ] README / env changes documented
- [ ] At least one test or manual test steps provided

---

**Testing & QA**
- Unit tests with Jest or Vitest for API logic
- Integration tests with Supertest for API routes
- Manual smoke tests:

```bash
npm run dev
# visit http://localhost:3000
# curl or visit /api/donors/recent
```

- Acceptance tests: login -> view donors -> verify JSON shapes and UI render

---

**Coding conventions & guidelines**
- Small single-purpose components
- Centralize config in `lib/config` and keep secrets in `.env.local`
- Keep API response shapes consistent with `README.md`
- Add JSDoc or brief comments for complex helpers

---

**AI / Copilot prompt templates**
- API route stub:

```
Create a Next.js API route at pages/api/donors/recent that returns JSON { donors: [{ id, name, amount, date }] } with example data and CORS-friendly headers. Keep code minimal and export default handler.
```

- DB model (Prisma):

```
Generate a Prisma schema for donors, donations, campaigns, and staff_users. Donor -> hasMany donations; donation -> optional campaign; staff_users -> role enum (admin, staff). Include createdAt, updatedAt timestamps and reasonable field types.
```

- Auth middleware:

```
Create Next.js middleware to check a session cookie or JWT, verify staff role, and reject with 401 for protected /api routes. Provide an example login route that issues the cookie.
```

- Test:

```
Write a Jest test for GET /api/donors/recent asserting status 200 and response contains donors array with id, name, amount, date.
```

---

**Mapping BUILD.md phases to repo deliverables**
- Phase 1 (Break Down): add `docs/business-context.md`, `docs/component-architecture.md`, `docs/data-flow.txt`
- Phase 2 (Understand & Document): add `docs/feature-spec.md`, `docs/data-models.md`, `docs/tech-decision.md`
- For each BUILD.md step create a small PR referencing the step and include the deliverable file(s).

---

**Quick commands summary**

```bash
npm install
npm run dev
npm run build
npm start
npm test
npm run lint
```

---

**Next suggested actions I can take now (choose one)**
- Create this `COPILOT_INSTRUCTIONS.md` in the repo (done).
- Scaffold `pages/api/donors/recent` with a stub returning example JSON.
- Add a minimal Prisma schema + SQLite config and a sample migration.

If you want one of the above, tell me which and I will scaffold it next.
