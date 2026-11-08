# Interactive 3D Developer Portfolio

A personal portfolio built with React, TypeScript and Three.js. A 3D object stays
fixed behind the page and is moved and rotated by GSAP ScrollTrigger as you scroll
through the sections.

This is **phase 1**: a working foundation with placeholder content and a placeholder
3D object, structured to grow incrementally.

## Quick start

Requires Node.js 20.19+ (or 22.12+).

```bash
npm install
npm run dev       # start dev server at http://localhost:5173
npm run build     # type-check (tsc -b) + production build into dist/
npm run preview   # serve the production build locally
npm run lint      # oxlint
```

## Tech stack

| Library | Role |
| --- | --- |
| **React + TypeScript** | UI components and type safety |
| **Vite** | Dev server with HMR, production bundler |
| **Tailwind CSS v4** | Styling via the `@tailwindcss/vite` plugin. Design tokens live in `src/styles/index.css` (`@theme`) |
| **Three.js** | The underlying WebGL 3D engine (scene, meshes, materials, lights) |
| **@react-three/fiber (R3F)** | Lets you write Three.js scenes as React components (`<mesh>`, `<group>`, …) inside a `<Canvas>` |
| **@react-three/drei** | Ready-made R3F helpers. Used for `useGLTF` (model loading) in `GltfModel.tsx`. Later: controls, environments, etc. |
| **GSAP + ScrollTrigger** | Animation engine. ScrollTrigger maps scroll position to timeline progress (`scrub`) |
| **@gsap/react** | `useGSAP()` hook — a React-safe `useLayoutEffect` that automatically reverts animations on unmount |
| **Lucide React** | Icons |

## Project structure

```text
public/
└── models/                  # Put .glb / .gltf files here (served as /models/…)
src/
├── App.tsx                  # Page composition: 3D layer + HTML layer
├── main.tsx                 # React entry point, imports global CSS
├── components/
│   ├── layout/              # Navbar, Footer
│   ├── three/               # Everything WebGL — no page layout in here
│   │   ├── Scene.tsx        # <Canvas>, camera, fixed full-screen layer
│   │   ├── Lighting.tsx     # Lights
│   │   ├── AnimatedModel.tsx# Group that receives the scroll animation
│   │   ├── PlaceholderModel.tsx # Torus knot stand-in (with idle spin)
│   │   ├── GltfModel.tsx    # Loader for a real .glb model (not used yet)
│   │   └── modelPoses.ts    # Per-section position/rotation/scale, desktop + mobile
│   └── ui/                  # Reusable presentational pieces (Section, Tag)
├── sections/                # Hero, About, Skills, Projects, Contact
├── hooks/
│   ├── useScrollAnimation.ts# GSAP ScrollTrigger logic for any Object3D
│   └── useMediaQuery.ts     # useMediaQuery / usePrefersReducedMotion
├── data/
│   └── portfolio.ts         # ALL editable content: profile, skills, projects, socials
├── lib/
│   ├── gsap.ts              # Registers GSAP plugins once; import gsap from here
│   ├── constants.ts         # Shared ids & media queries
│   └── cn.ts                # className join helper
└── styles/
    └── index.css            # Tailwind import, theme tokens, base styles
```

Changes from the suggested structure: models go in `public/models/` instead of
`src/assets/models/`, because `useGLTF` loads by URL and large binary files shouldn't
pass through the bundler. Pose data (`modelPoses.ts`), a separate `PlaceholderModel`,
and a `lib/` folder were added to keep responsibilities apart.

## Architecture

### Two independent layers

```text
┌──────────────────────────────────────┐
│ Navbar (fixed, z-50)                  │
│ <main id="content"> sections (z-10)   │  ← normal document scroll
│ Footer                                │
├──────────────────────────────────────┤
│ <Scene> fixed inset-0, z-0            │  ← WebGL canvas, never scrolls
└──────────────────────────────────────┘
```

- The **HTML layer** is ordinary React + Tailwind. Sections don't know the 3D scene exists.
- The **3D layer** (`Scene.tsx`) is a fixed, full-viewport `<Canvas>` with
  `pointer-events: none` and `aria-hidden`. It's **lazy-loaded** (`React.lazy`) so the
  text renders before the ~290 kB (gzipped) Three.js chunk arrives.
- The only link between them is **scroll position of `#content`**, which ScrollTrigger reads.

### How the scroll animation works

1. `modelPoses.ts` defines one `ModelPose` (position, rotation, scale) per section,
   separately for desktop and mobile. It's typed as `Record<SectionId, ModelPose>`, so
   adding a section to `data/portfolio.ts` without a pose is a TypeScript error.
2. `AnimatedModel` wraps its children in a `<group>` and calls `useScrollAnimation` on it.
3. `useScrollAnimation` builds one GSAP timeline that tweens the group through the poses,
   attached to a ScrollTrigger spanning `#content` from `top top` to `bottom bottom`
   with `scrub: 1` (the model catches up with the scrollbar over about 1 second, which
   smooths the motion).
4. GSAP tweens the Three.js objects directly (`object.position`, `object.rotation`,
   `object.scale`). R3F renders every frame, so the changes appear immediately.

Because the animation targets the **wrapper group**, a model's own animations (the
placeholder's idle spin, or a GLTF's animation clips later) never conflict with the
scroll animation.

### Responsiveness, accessibility, cleanup

- `gsap.matchMedia()` picks desktop or mobile poses at the 768px breakpoint (the same as
  Tailwind's `md`) and rebuilds the timeline when you cross it.
- **`prefers-reduced-motion`**: no scroll-driven movement (the model stays in its first
  pose), no idle spin, no smooth anchor scrolling, and section text gets a solid backdrop
  so it's never obscured.
- **Cleanup**: `useGSAP` runs inside a GSAP context and the hook returns `mm.revert()`, so
  on unmount every tween and ScrollTrigger is killed and the object's transform is restored.
  No manual `ScrollTrigger.kill()` bookkeeping.
- Semantic landmarks (`header/nav/main/section/footer`), `aria-labelledby` headings, a
  skip link, visible focus rings, and muted text at ≥ 7:1 contrast on the background.

## Common tasks

### Edit content

Everything lives in `src/data/portfolio.ts`: name, tagline, about text, skills, projects,
social links. Components only render that data.

### Replace the placeholder with a real 3D model

1. Put the file in `public/models/`, e.g. `public/models/laptop.glb`.
   (Compress it first, e.g. `npx gltf-transform optimize in.glb out.glb`.)
2. In `src/components/three/Scene.tsx`, swap the child of `<AnimatedModel>`:

   ```tsx
   import { GltfModel } from './GltfModel'
   // …
   <AnimatedModel poses={modelPoses} trigger={`#${CONTENT_ID}`}>
     <GltfModel url="/models/laptop.glb" scale={0.8} rotation={[0, Math.PI, 0]} />
   </AnimatedModel>
   ```

   Use `GltfModel`'s own `position/rotation/scale` props to fix the model's origin and
   size. Leave scroll motion to `modelPoses.ts`.
3. Optionally preload it: `useGLTF.preload('/models/laptop.glb')` at the bottom of `GltfModel.tsx`.
4. Adjust `modelPoses.ts` until it sits well in each section.

### Add a section

1. Add `{ id: 'blog', label: 'Blog' }` to `sections` in `data/portfolio.ts`.
2. Create `src/sections/Blog.tsx` using `<Section id="blog" …>` and render it in `App.tsx`.
3. TypeScript will now require a `blog` pose in both maps in `modelPoses.ts`.

### Add more scroll animations

- **More 3D motion**: add a pose, or add extra tweens to the timeline in
  `useScrollAnimation.ts`. Material color, light intensity and camera position are also
  plain objects GSAP can tween.
- **HTML animations** (e.g. fading in a section's content): keep them in the section
  component, scoped to that component's DOM:

  ```tsx
  import { useRef } from 'react'
  import { gsap, useGSAP } from '../lib/gsap'

  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.reveal', {
        y: 40, opacity: 0, stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      })
    })
  }, { scope: ref }) // '.reveal' only matches inside ref
  ```

  Always import from `lib/gsap.ts` and always use `useGSAP` so cleanup is automatic.

## Notes

- The production build has one ~1 MB (290 kB gzipped) chunk for the 3D scene; this is
  Three.js itself. It's lazy-loaded, and the chunk-size warning threshold was raised in
  `vite.config.ts` on purpose.
- Lucide v1 no longer includes brand logos, so GitHub/LinkedIn use generic icons
  (see `sections/Contact.tsx`). Add brand SVGs there if you want them.
