import { sections, type SectionId } from '../../data/portfolio'
import type { ModelPose, ResponsivePoses } from '../../hooks/useScrollAnimation'

/*
 * One pose per section. The camera sits at z = 6 looking at the origin, so on
 * a 16:9 screen x ranges roughly from -4.4 to 4.4 and y from -2.5 to 2.5.
 * On desktop the model alternates sides, opposite to the section's text.
 */

const TURN = Math.PI * 2

const desktop: Record<SectionId, ModelPose> = {
  hero: { position: [2.2, 0, 0], rotation: [0.2, 0, 0], scale: 1 },
  about: { position: [-2.3, 0.1, 0], rotation: [-0.2, TURN * 0.5, 0.1], scale: 0.85 },
  skills: { position: [2.3, -0.1, 0], rotation: [0.3, TURN, 0], scale: 0.9 },
  projects: { position: [-2.85, 0, -0.5], rotation: [-0.1, TURN * 1.5, -0.1], scale: 0.68 },
  contact: { position: [2.1, 0, -0.3], rotation: [0, TURN * 2, 0], scale: 0.85 },
}

// Portrait phones see far less horizontal space (x ≈ ±1.15 at z = 0), so the
// model is small, pushed back, and centered. In the hero it sits above the text.
const mobile: Record<SectionId, ModelPose> = {
  hero: { position: [0, 1.35, -1], rotation: [0.2, 0, 0], scale: 0.45 },
  about: { position: [0, 0.8, -2], rotation: [-0.2, TURN * 0.5, 0], scale: 0.45 },
  skills: { position: [0, -0.8, -2], rotation: [0.3, TURN, 0], scale: 0.45 },
  projects: { position: [0, 0.8, -2], rotation: [-0.1, TURN * 1.5, 0], scale: 0.4 },
  contact: { position: [0, 1.2, -1.5], rotation: [0, TURN * 2, 0], scale: 0.45 },
}

// Ordered by the `sections` list, so adding a section forces a pose here (TS error otherwise).
export const modelPoses: ResponsivePoses = {
  desktop: sections.map(({ id }) => desktop[id]),
  mobile: sections.map(({ id }) => mobile[id]),
}
