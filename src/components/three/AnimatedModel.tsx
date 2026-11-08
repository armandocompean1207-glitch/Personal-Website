import { useRef, type ReactNode } from 'react'
import type { Group } from 'three'
import { useScrollAnimation, type ResponsivePoses } from '../../hooks/useScrollAnimation'

interface AnimatedModelProps {
  poses: ResponsivePoses
  /** CSS selector of the element whose scroll range drives the animation. */
  trigger: string
  children: ReactNode
}

/**
 * Wrapper group that owns the scroll-driven transform.
 * Whatever is passed as children (placeholder mesh, GLTF model…) inherits it,
 * so swapping the model never touches the animation code.
 */
export function AnimatedModel({ poses, trigger, children }: AnimatedModelProps) {
  const groupRef = useRef<Group>(null)
  useScrollAnimation(groupRef, { poses, trigger })

  return <group ref={groupRef}>{children}</group>
}
