import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Mesh } from 'three'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

/**
 * Temporary stand-in for a real model. It adds a slow idle spin on its own
 * mesh; the scroll animation is applied separately by the parent group, so
 * the two never fight over the same transform.
 */
export function PlaceholderModel() {
  const meshRef = useRef<Mesh>(null)
  const reduceMotion = usePrefersReducedMotion()

  useFrame((_, delta) => {
    const mesh = meshRef.current
    if (!mesh || reduceMotion) return
    mesh.rotation.x += delta * 0.12
    mesh.rotation.y += delta * 0.2
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.32, 180, 24]} />
      <meshStandardMaterial color="#c9cfd6" metalness={0.55} roughness={0.28} />
    </mesh>
  )
}
