import { profile } from '../../data/portfolio'

// Computed once at load so render stays pure.
const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {YEAR} {profile.name}
        </p>
        <p>Built with React, Three.js and GSAP.</p>
      </div>
    </footer>
  )
}
