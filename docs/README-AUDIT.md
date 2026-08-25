# GitHub Profile README Audit

Audit date: **2026-08-25**

## Scope

The local profile repository initially contained only a 32,545-byte `README.md`; it had no local assets and no Git metadata in the supplied workspace. The current public/private project state was checked through the authenticated GitHub API, shallow read-only audit clones, current workflow runs, and public deploys.

## Selected work: verified facts

| Project | Visibility | API routes/endpoints | Automated checks found | Current CI | Public surface |
|---|---:|---:|---:|---|---|
| TireMax ERP | Public | 73 Express route declarations | 148 tests documented by the current project README; 145 direct test calls plus parameterized cases | Passing — backend tests and frontend build | `https://tiremax.vercel.app` |
| EduLex | Private | 52 ASP.NET `[Http*]` endpoint attributes | 166 xUnit cases (137 facts + 29 inline theory cases) and 15 Playwright specs | Backend, frontend and mobile pass; E2E currently fails | `https://edulex.vercel.app` |
| FinAI Família | Private | 30 ASP.NET `[Http*]` endpoint attributes | 104 total: 57 xUnit + 33 Vitest + 14 Playwright | Passing — backend, frontend and E2E | `https://frontend-production-047c.up.railway.app` |

The visual aggregate therefore uses **155 API routes/endpoints** and **433 automated checks defined** across the three projects. “Defined” is intentional: the latest EduLex E2E job is failing and the profile does not present all 433 as currently passing.

## Key inconsistencies corrected

- The old profile summary listed EduLex as 28 tests while its detailed section claimed 124. Current code contains 166 xUnit cases plus 15 E2E specs.
- The old TireMax section described manual-only tenant isolation, no automated tests, no CI and no rate limiting. The current repository has a Prisma client extension backed by `AsyncLocalStorage`, a Jest/Supertest suite, passing CI, Helmet and rate limiting.
- TireMax metadata points to `https://tiremax.shop`, but that domain timed out during verification. The Vercel URL remains live and is used instead.
- The TireMax public demo credentials documented in the project README returned “Credenciais inválidas”; no authenticated dashboard screenshot was claimed.
- EduLex is now private. The profile no longer links recruiters to a repository they cannot open.
- FinAI uses the private repository `Controle-de-Finan-as`; its public Railway surface, production description and current CI were verified.
- The previous top-level “140+ endpoints” claim is replaced by a traceable 155-route count for the three selected projects only.

## Screenshots and assets

- `tiremax-landing.webp`: captured from the live public Vercel landing page.
- `edulex-login.webp`: captured from the live public EduLex login surface.
- `finai-login.webp`: captured from the live public FinAI login surface.
- No authenticated screenshot was fabricated. Capturing product dashboards later requires valid non-sensitive demo accounts.
- The Earth hero was generated as a new raster background, then combined with deterministic HTML/CSS typography and compressed to WebP.
- A dedicated 800 × 950 mobile hero preserves readable hierarchy on narrow screens instead of shrinking the desktop artwork.

## Links verified

- GitHub: `https://github.com/RobersonCodes`
- LinkedIn: `https://www.linkedin.com/in/roberson-de-oliveira-tecnologia` (public URL is valid; anonymous browsing reaches LinkedIn's auth wall)
- Portfolio: `https://oliveirasystems.dev` redirects successfully to `https://www.oliveirasystems.dev/`
- TireMax: `https://tiremax.vercel.app`
- EduLex: `https://edulex.vercel.app`
- FinAI Família: `https://frontend-production-047c.up.railway.app`

## Automatic project updates

`.github/workflows/refresh-profile.yml` runs daily, manually, or through a `repository_dispatch` event. It updates only the bounded `AUTO-REPOS` block and includes public, non-fork, non-archived repositories. Curated flagship work never changes automatically.

GitHub does not emit a cross-repository event to the profile repository when a personal repository is created. For near-instant refresh, a new repository can dispatch `profile-refresh` to this repository through a narrowly scoped fine-grained token or GitHub App. The daily schedule is the zero-maintenance default.
