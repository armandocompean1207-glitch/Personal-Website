import { ArrowDown } from 'lucide-react'
import { profile } from '../data/portfolio'

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      // Mobile: text sits in the lower half, under the model.
      className="flex min-h-svh items-end pt-24 pb-16 md:items-center md:pb-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="text-sm font-medium tracking-widest text-accent uppercase">{profile.role}</p>
          <h1 id="hero-title" className="mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">
            Hi, I’m {profile.name}.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">{profile.tagline}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-accent px-6 py-3 font-medium text-background transition-opacity hover:opacity-90"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-line px-6 py-3 font-medium transition-colors hover:border-accent"
            >
              Get in touch
            </a>
          </div>

          <a
            href="#about"
            className="mt-16 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
          >
            <ArrowDown aria-hidden="true" size={16} />
            Scroll to explore
          </a>
        </div>
      </div>
    </section>
  )
}
