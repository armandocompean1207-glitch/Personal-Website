import { lazy, Suspense } from 'react'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { copy } from './data/portfolio'
import { CONTENT_ID } from './lib/constants'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'

// Three.js is large; loading the scene lazily lets the HTML render first.
const Scene = lazy(() => import('./components/three/Scene'))

export default function App() {
  return (
    <>
      <a
        href={`#${CONTENT_ID}`}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-chrome focus:px-4 focus:py-2 focus:text-void"
      >
        {copy.a11y.skipToContent}
      </a>

      {/* Layer 1: 3D background, fixed to the viewport. */}
      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      {/* Layer 2: HTML content, scrolls over the scene. */}
      <Navbar />
      <main id={CONTENT_ID} className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
