import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CONTENT_ID } from '../../lib/constants'
import { AnimatedModel } from './AnimatedModel'
import { Lighting } from './Lighting'
import { modelPoses } from './modelPoses'
import { PlaceholderModel } from './PlaceholderModel'

/**
 * Fixed, full-viewport WebGL layer that sits behind the HTML content.
 * It knows nothing about page layout — it only reads scroll progress of
 * the #content element through the AnimatedModel's ScrollTrigger.
 */
export default function Scene() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        fallback={null}
      >
        <Lighting />
        {/* Suspense lets a future GLTF model load without blocking the page. */}
        <Suspense fallback={null}>
          <AnimatedModel poses={modelPoses} trigger={`#${CONTENT_ID}`}>
            <PlaceholderModel />
            {/* Later: <GltfModel url="/models/your-model.glb" /> */}
          </AnimatedModel>
        </Suspense>
      </Canvas>
    </div>
  )
}
