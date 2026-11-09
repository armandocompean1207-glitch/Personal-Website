import { ButtonLink } from '../components/ui/Button'
import { ContentColumn } from '../components/ui/ContentColumn'
import { Eyebrow } from '../components/ui/Eyebrow'
import { copy, profile } from '../data/portfolio'

export function Hero() {
  const { greeting, primaryCta, secondaryCta, scrollCue } = copy.hero

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      // Mobile: text sits in the lower half, under the model.
      className="relative flex min-h-svh items-end pt-24 pb-12 lg:items-center lg:pb-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <ContentColumn width="wide">
          <Eyebrow>{profile.role}</Eyebrow>
          <h1
            id="hero-title"
            className="mt-6 bg-linear-to-b from-chrome via-chrome to-silver bg-clip-text pb-2 text-5xl font-semibold tracking-display text-balance text-transparent sm:text-7xl lg:text-8xl forced-colors:bg-none forced-colors:text-[CanvasText]"
          >
            {greeting} {profile.name}.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-pretty text-muted sm:text-xl">
            {profile.tagline}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="secondary">
              {secondaryCta.label}
            </ButtonLink>
          </div>

          <a
            href="#about"
            className="mt-16 inline-flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-muted uppercase transition-colors hover:text-foreground"
          >
            <span
              aria-hidden="true"
              className="relative h-8 w-px bg-linear-to-b from-transparent to-silver/70"
            >
              <span className="absolute -bottom-0.5 -left-0.5 size-1.5 rounded-full bg-chrome" />
            </span>
            {scrollCue}
          </a>
        </ContentColumn>
      </div>
    </section>
  )
}
