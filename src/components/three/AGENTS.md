# 3D scene

## Overview

A fixed, full screen WebGL layer that sits behind the HTML and is lazy loaded from `App.tsx`. One object (a placeholder now, a real `.glb`/`.gltf` model later) moves through a pose for each section as you scroll the `#content` element.

## Key files

| File | Owns |
|---|---|
| `Scene.tsx` | The `<Canvas>`, camera at z 6 with fov 45, and the `<Suspense>` for model loading. Default export because `React.lazy` needs it. |
| `AnimatedModel.tsx` | The wrapper `<group>` that the scroll animation moves. The model goes inside it as children. |
| `modelPoses.ts` | Position, rotation and scale for each section, separately for desktop and mobile |
| `../../hooks/useScrollAnimation.ts` | GSAP timeline, ScrollTrigger and `matchMedia` logic for any `Object3D` |
| `PlaceholderModel.tsx` | The torus knot stand in, with its own idle spin |
| `GltfModel.tsx` | `useGLTF` loader, ready to swap in for the placeholder |
| `Lighting.tsx` | Ambient, key and accent lights. There's no HDR environment, so nothing is fetched from a CDN. |

## Conventions

- Model files go in `public/models/` and are loaded by URL, for example `<GltfModel url="/models/name.glb" />`. A `.gltf` must keep its `.bin` and texture files next to it, with the same relative paths.
- To use a real model, replace `<PlaceholderModel />` inside `<AnimatedModel>` in `Scene.tsx`. Fix the model's own origin, size and facing with `GltfModel`'s `position`/`rotation`/`scale` props. Never put scroll motion there.
- Scroll motion lives only in `modelPoses.ts`. The poses are typed `Record<SectionId, ModelPose>`, so a new section in `data/portfolio.ts` fails typecheck until it has a pose.
- The model's own motion (idle spin, glTF animation clips) goes on the inner mesh or scene. The scroll animation owns the outer group, so the two never conflict.
- The canvas has `pointer-events-none` and `aria-hidden`. If you add interactivity such as OrbitControls, revisit both.

## Gotchas

- `gsap.matchMedia` with a conditions object runs only when at least one condition matches. Keep `isDesktop` and `isMobile` complementary, or phones get no pose at all.
- The timeline gives each section an equal share of the scroll. It only lines up because every section is at least `min-h-svh`.
- Portrait phones see about x ±1.15 at z 0, so mobile poses must stay small (scale about 0.45) and pushed back.
- Breakpoint 768px (`DESKTOP_MEDIA_QUERY`) must match Tailwind `md`, because section text alignment switches at the same width.
- three.js is about 1 MB of the bundle (290 kB gzipped). That's why `Scene` is lazy loaded and `chunkSizeWarningLimit` is raised in `vite.config.ts`.
- Verify 3D changes in a real browser at both desktop and phone widths, with reduced motion on and off. A clean `tsc` proves nothing about the scene.

## Agent skills

- [threejs-react-three-fiber](../../../.claude/skills/threejs-react-three-fiber/): `cloudai-x/threejs-skills`, R3F components, hooks and the render loop
- [threejs-loaders](../../../.claude/skills/threejs-loaders/): `cloudai-x/threejs-skills`, loading glTF/GLB models and textures
- [threejs-asset-pipeline](../../../.claude/skills/threejs-asset-pipeline/): `cloudai-x/threejs-skills`, compressing and checking models (gltf-transform, Draco, gltfjsx)
- [threejs-animation](../../../.claude/skills/threejs-animation/): `cloudai-x/threejs-skills`, glTF animation clips and AnimationMixer
- [threejs-materials](../../../.claude/skills/threejs-materials/): `cloudai-x/threejs-skills`, materials and PBR settings
- [threejs-lighting](../../../.claude/skills/threejs-lighting/): `cloudai-x/threejs-skills`, lights and shadows
- [threejs-fundamentals](../../../.claude/skills/threejs-fundamentals/): `cloudai-x/threejs-skills`, scene, camera and core Three.js concepts

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
