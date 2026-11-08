import { useGLTF } from '@react-three/drei'
import type { ThreeElements } from '@react-three/fiber'

type GltfModelProps = ThreeElements['group'] & {
  /** Public URL of a .glb/.gltf file, e.g. "/models/laptop.glb" (file in public/models/). */
  url: string
}

/**
 * Ready-to-use loader for a real model. Not rendered yet — swap it in for
 * <PlaceholderModel /> inside <AnimatedModel> in Scene.tsx. It suspends while
 * loading, which the <Suspense> in Scene.tsx handles.
 *
 * Use the group props (position/rotation/scale) to correct the model's own
 * origin or size; the scroll animation is applied on top by AnimatedModel.
 */
export function GltfModel({ url, ...groupProps }: GltfModelProps) {
  const { scene } = useGLTF(url)

  return (
    <group {...groupProps}>
      <primitive object={scene} />
    </group>
  )
}
