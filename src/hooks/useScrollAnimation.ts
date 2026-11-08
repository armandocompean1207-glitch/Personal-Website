import type { RefObject } from 'react'
import type { Object3D } from 'three'
import { DESKTOP_MEDIA_QUERY, REDUCED_MOTION_QUERY } from '../lib/constants'
import { gsap, useGSAP } from '../lib/gsap'

export type Vec3 = readonly [x: number, y: number, z: number]

/** Where the 3D object should be while a given section is in view. */
export interface ModelPose {
  position: Vec3
  /** Euler angles in radians. */
  rotation: Vec3
  scale: number
}

/** One pose per section, in page order, for each layout. */
export interface ResponsivePoses {
  desktop: readonly ModelPose[]
  mobile: readonly ModelPose[]
}

export interface ScrollAnimationOptions {
  poses: ResponsivePoses
  /** CSS selector of the element whose scroll range drives the animation. */
  trigger: string
  /** `true` = locked to scroll, a number = seconds of smoothing lag. */
  scrub?: boolean | number
}

const toXYZ = ([x, y, z]: Vec3) => ({ x, y, z })
const uniform = (s: number) => ({ x: s, y: s, z: s })

/**
 * Drives any Three.js object (mesh, group, loaded GLTF scene…) through a list
 * of poses as the user scrolls through `trigger`.
 *
 * - gsap.matchMedia() rebuilds the timeline when the viewport crosses the
 *   desktop breakpoint, and skips scroll motion under prefers-reduced-motion.
 * - Everything is reverted on unmount (useGSAP context + mm.revert()), which
 *   kills the ScrollTrigger and restores the object's original transform.
 */
export function useScrollAnimation(
  target: RefObject<Object3D | null>,
  { poses, trigger, scrub = 1 }: ScrollAnimationOptions,
): void {
  useGSAP(
    () => {
      const object = target.current
      if (!object) return

      const mm = gsap.matchMedia()

      // matchMedia only runs the callback when at least one condition matches,
      // so isDesktop and isMobile are complementary to guarantee it always runs.
      mm.add(
        {
          isDesktop: DESKTOP_MEDIA_QUERY,
          isMobile: `not all and ${DESKTOP_MEDIA_QUERY}`,
          reduceMotion: REDUCED_MOTION_QUERY,
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean
            reduceMotion: boolean
          }
          const [first, ...rest] = isDesktop ? poses.desktop : poses.mobile
          if (!first) return

          // gsap.set (rather than direct assignment) so mm.revert() can undo it.
          gsap.set(object.position, toXYZ(first.position))
          gsap.set(object.rotation, toXYZ(first.rotation))
          gsap.set(object.scale, uniform(first.scale))

          if (reduceMotion || rest.length === 0) return

          // One timeline mapped to the whole content height. Each pose gets an
          // equal slice of scroll, which lines up with sections because every
          // section is at least one viewport tall.
          const timeline = gsap.timeline({
            defaults: { duration: 1, ease: 'power1.inOut' },
            scrollTrigger: {
              trigger,
              start: 'top top',
              end: 'bottom bottom',
              scrub,
            },
          })

          for (const pose of rest) {
            timeline
              .to(object.position, toXYZ(pose.position))
              .to(object.rotation, toXYZ(pose.rotation), '<')
              .to(object.scale, uniform(pose.scale), '<')
          }
        },
      )

      return () => mm.revert()
    },
    { dependencies: [poses, trigger, scrub], revertOnUpdate: true },
  )
}
