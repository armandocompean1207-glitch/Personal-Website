# 0001 · Dark metallic redesign with a robot companion

Status: Phase 1 in progress · Robot model: **not yet provided** (`public/models/robot.glb`)

## Goal

Redesign the portfolio around a dark, metallic, subtly sci‑fi look, with a 3D robot as the centerpiece. It reacts to scroll (a different pose per section), to the mouse (head tracking) and to hovers (looking at projects and links). The stack and the five sections (Hero, About, Skills, Projects, Contact) stay the same.

## Current architecture (baseline)

- Two independent layers: the HTML content scrolls over a fixed, lazy‑loaded R3F `<Canvas>` (`pointer-events-none`, `aria-hidden`).
- Their only link is the scroll progress of `<main id="content">`, read by one GSAP ScrollTrigger timeline (`hooks/useScrollAnimation.ts`) that tweens the `AnimatedModel` wrapper group through per‑section poses (`components/three/modelPoses.ts`, desktop and mobile).
- Content lives in `data/portfolio.ts`. GSAP is registered once in `lib/gsap.ts`. Cleanup runs through `useGSAP` plus `mm.revert()`.

## Target architecture

### Transform stack (each layer owned by exactly one system)

```text
ScrollGroup   ← GSAP ScrollTrigger: position / rotation / scale per section   (Subagent C)
 └ FloatGroup ← idle float: procedural sine bob, disabled for reduced motion  (Subagent C)
    └ Robot scene (cloned GLB)
       ├ bones/meshes ← AnimationMixer clips: idle / sit / point / wave       (Subagent C)
       └ head         ← head tracking, applied AFTER the mixer as an additive offset (Subagent B)
```

Nothing writes to another layer's transform. That's what keeps idle, scroll, clips and head tracking from fighting.

### Per‑frame order (one `useFrame` in `RobotController`, owned by the main agent)

1. Director: damp `headInfluence` toward its target.
2. `mixer.update(delta)`, which sets the bone poses from the clips.
3. Idle float on `FloatGroup`.
4. Head tracking: `head.quaternion = clipPose × offset(yaw, pitch) × influence`.

### Shared state: the robot director (plain object, not React state)

The `src/robot/director.ts` module exports one mutable object. Writers: ScrollTrigger callbacks (current section) and a single delegated `pointerover` listener (hovered anchor). Readers: `useFrame`. No React re‑renders per frame or per hover.

```ts
type RobotPose = 'idle' | 'sit' | 'present' | 'point' | 'wave'
interface RobotDirector {
  section: SectionId
  pose: RobotPose              // requested pose; animator maps it to a clip if the GLB has one
  headInfluence: number        // target 0..1 (lower during gestures and transitions)
  lookTarget: { x: number; y: number } | null // normalized −1..1 screen point, from a hovered anchor; null = follow pointer
}
```

### HTML → 3D contract: `data-robot-anchor`

HTML elements the robot may look at carry `data-robot-anchor="<kind>:<id>"`, for example `about:bio`, `skill:<group>`, `project:<index>`, `social:<kind>`. The 3D side finds them with a delegated listener and reads `getBoundingClientRect()`. Sections never import 3D code.

### Central section config: `src/robot/sectionConfig.ts` (replaces `modelPoses.ts`)

```ts
interface RobotSectionConfig {
  transform: { desktop: ModelPose; mobile: ModelPose }
  pose: RobotPose
  headInfluence: number
  camera?: { position: Vec3; fov?: number }
  effects?: { rimIntensity?: number }
}
export const robotSections: Record<SectionId, RobotSectionConfig>
```

Robot side on desktop (the HTML layout must leave this side free): hero **right**, about **left**, skills **right**, projects **left**, contact **right**.

### Robot model adapter (`src/robot/rig.ts`)

On load, inspect the GLB and build `RobotRig { root, head: Object3D | null, headKind: 'bone' | 'mesh' | null, clips: Partial<Record<RobotPose, AnimationClip>> }`. The head is found by name heuristics (head, neck, Head_jnt…) with a manual override in config. Clips are matched by name. Anything missing degrades gracefully: no clip means only a transform change, no head means no head tracking.

## File ownership

| Area | Owner | Files |
|---|---|---|
| Theme, tokens, UI primitives, section layouts | A · UI/UX | `src/styles/**`, `src/components/ui/**`, `src/components/layout/**`, `src/sections/**`, `index.html` |
| Content data | A (main approves schema changes) | `src/data/portfolio.ts` |
| Canvas, lighting, environment, model loading, rig, head tracking | B · 3D | `src/components/three/Scene.tsx`, `Lighting.tsx`, `src/robot/RobotModel.tsx`, `rig.ts`, `useHeadTracking.ts`, `pointer.ts` |
| Director, section config, scroll, idle, clips | C · Animation | `src/robot/director.ts`, `sectionConfig.ts`, `useRobotScroll.ts`, `useRobotAnimator.ts`, `useIdleFloat.ts` |
| Frame order and integration | Main | `src/robot/RobotController.tsx`, `src/App.tsx`, `src/lib/**` |
| Review | D · QA | Reports only. Fixes go back to the owner. |

## Phases and acceptance criteria

1. **Design system and layout** (A, then D). Palette tokens, typography and the reusable primitives (Section, Card, Button, Tag, Divider) are in place, and all five sections are restyled. On desktop the robot's side stays free. Every section has `data-robot-anchor` attributes. Build and lint pass. No horizontal overflow at 390 px. WCAG AA contrast. The 3D code is untouched.
2. **Robot foundation** (B, then D). *Blocked on `robot.glb`.* Inspection report (bones, meshes, clips, size, triangle count) → rig adapter → `RobotModel` with a fallback placeholder → head tracking (±25° yaw, ±15° pitch, frame‑rate‑independent damping, returns to neutral on `pointerleave`, off for coarse pointers and reduced motion) → environment reflections from local Lightformers (no CDN HDR).
3. **Scroll experience** (C, with interfaces agreed with B). `sectionConfig` replaces `modelPoses`, the director is wired to ScrollTrigger, and there's one timeline. Camera framing per section if needed.
4. **Personality** (C, plus B for look‑at). Clip crossfades for the sit, point and wave poses (only if they exist in the GLB), plus hover look‑at through anchors. Head influence drops during gestures.
5. **QA** (D). Desktop and mobile, links, performance (dpr cap, draw calls), loading state, reduced motion, production build.

## Decisions

- **Font**: Inter Tight (variable), self‑hosted through `@fontsource-variable/inter-tight`, so there are no third‑party CDN requests. Small labels use the system monospace stack for a subtle technical feel.
- **No HDR from a CDN**: reflections come from drei `<Environment>` with `<Lightformer>`s, which are generated locally.
- **Mouse source**: a `window` `pointermove` listener, not R3F pointer events, because the canvas ignores pointer events by design.
- **Reduced motion**: no float, no head tracking, no scrubbed movement. The robot holds its hero pose, and clips play only as static end poses.

## Open questions

- `robot.glb`: rigged or not? Which clips? Phases 2 to 4 adapt to whatever the inspection finds.
