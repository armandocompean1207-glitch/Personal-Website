# Interactive 3D Developer Portfolio

A personal portfolio site with a fixed 3D object behind the page that moves as you scroll. Static frontend only: no backend, no database.

## Stack

- **Language / Runtime**: TypeScript 7, React 19, Node 20.19+ for tooling
- **Framework**: Vite 8 (single page app), Tailwind CSS v4 via `@tailwindcss/vite`
- **Key dependencies**: three, @react-three/fiber, @react-three/drei, gsap + ScrollTrigger (@gsap/react), lucide-react
- **Package manager**: npm

## Build approach

<TBD, set by /scope>

## Commands

```bash
npm install       # Install
npm run dev       # Dev server, http://localhost:5173
npm run build     # Typecheck (tsc -b) + production build
npm run lint      # oxlint
npm run preview   # Serve the production build
# Test: no runner yet. Gate is typecheck + lint + a manual browser check (/check verify)
```

## Specs

Stored in `docs/specs/`. Format: `docs/specs/NNNN-title.md`.

## Rules

- Functional style: components and helpers are pure functions of props and data. Use composition, not classes or inheritance.
- Data is immutable: `const`, `readonly`, `as const`. Module level variables are constants only. The one exception is Three.js objects, which are mutated inside `useFrame` or GSAP tweens on purpose.
- Side effects live at the edges: `useGSAP`, `useEffect`, `useFrame`. Never in render.
- Content lives only in `src/data/portfolio.ts`. Components render it and never hardcode copy.
- The 3D layer (`src/components/three/`) knows nothing about page layout. The two only share the scroll position of `#content`. See the nested doc.
- Import GSAP only from `src/lib/gsap.ts`, and create animations only inside `useGSAP` so they clean up on unmount.
- Respect `prefers-reduced-motion` for any new motion, and keep semantic HTML, labels and visible focus states.
- Types are gradual: strict for new code. An `any` needs a comment saying why.
- Naming: PascalCase components and files, `useX` hooks, camelCase functions and data, SCREAMING_CASE constants, kebab case section ids.
- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`.

## Tooling

- Lint and format: oxlint (installed) plus Prettier (to install via `/develop tooling`).
- Before commit: a hook runs lint, format check and typecheck (to install via `/develop tooling`).
- CI: not yet. Add it when the repo has a GitHub remote.

## Git

- integration: off

## Agent skills

- [gsap-core](.claude/skills/gsap-core/): `greensock/gsap-skills`, tweens, eases, matchMedia, reduced motion
- [gsap-timeline](.claude/skills/gsap-timeline/): `greensock/gsap-skills`, sequencing and position parameters
- [gsap-scrolltrigger](.claude/skills/gsap-scrolltrigger/): `greensock/gsap-skills`, scroll linked animation, scrub, refresh
- [gsap-react](.claude/skills/gsap-react/): `greensock/gsap-skills`, `useGSAP`, scoping and cleanup in React
- [gsap-performance](.claude/skills/gsap-performance/): `greensock/gsap-skills`, smooth animation and avoiding layout thrash
- [vercel-react-best-practices](.claude/skills/vercel-react-best-practices/): `vercel-labs/agent-skills`, React rendering and bundle performance
- [vercel-composition-patterns](.claude/skills/vercel-composition-patterns/): `vercel-labs/agent-skills`, component composition and props design
- [web-design-guidelines](.claude/skills/web-design-guidelines/): `vercel-labs/agent-skills`, UI, UX and accessibility review
- [tailwind-4-docs](.claude/skills/tailwind-4-docs/): `lombiq/tailwind-agent-skills`, Tailwind v4 syntax and docs (needs its docs sync script run once)

Three.js skills are listed in the 3D nested doc. Skills are gitignored; restore them from `skills-lock.json` with `npx skills experimental_install`.

## Context files

- [src/components/three/AGENTS.md](src/components/three/AGENTS.md): the WebGL scene, scroll animation and where 3D models go

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
