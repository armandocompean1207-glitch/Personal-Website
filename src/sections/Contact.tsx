import { ArrowUpRight, Briefcase, CodeXml, Globe, Mail, type LucideIcon } from 'lucide-react'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Section } from '../components/ui/Section'
import { copy, profile, socials, type SocialKind } from '../data/portfolio'

// Lucide v1 no longer ships brand logos, so socials use generic icons.
// Swap in SVG brand icons here later if you want them.
const icons: Record<SocialKind, LucideIcon> = {
  email: Mail,
  github: CodeXml,
  linkedin: Briefcase,
  website: Globe,
}

// The email address is shown as the large primary link, so the list skips it.
const OTHER_SOCIALS = socials.filter(({ kind }) => kind !== 'email')

export function Contact() {
  return (
    <Section id="contact" eyebrow={copy.contact.eyebrow} title={copy.contact.title}>
      <p className="text-lg leading-relaxed text-pretty text-muted">{copy.contact.intro}</p>

      {/* Primary call to action: chrome-gradient address over a silver underline. */}
      <a
        href={`mailto:${profile.email}`}
        data-robot-anchor="social:email"
        className="group mt-10 inline-block max-w-full border-b border-silver/40 pb-3 transition-colors hover:border-chrome"
      >
        <span className="block bg-linear-to-b from-chrome to-silver bg-clip-text text-3xl font-semibold tracking-display text-transparent [overflow-wrap:anywhere] sm:text-5xl lg:text-4xl xl:text-5xl forced-colors:bg-none forced-colors:text-[CanvasText]">
          {profile.email}
        </span>
      </a>

      {OTHER_SOCIALS.length > 0 && (
        <>
          <Eyebrow className="mt-14">{copy.contact.elsewhereLabel}</Eyebrow>
          <ul className="mt-5 divide-y divide-line/70 border-y border-line/70">
            {OTHER_SOCIALS.map(({ kind, label, href }) => {
              const Icon = icons[kind]
              const isExternal = !href.startsWith('mailto:')
              return (
                <li key={label}>
                  <a
                    href={href}
                    data-robot-anchor={`social:${kind}`}
                    {...(isExternal && {
                      target: '_blank',
                      rel: 'noreferrer',
                      'aria-label': `${label} ${copy.a11y.opensInNewTab}`,
                    })}
                    className="group flex items-center gap-3 py-4 text-muted transition-colors hover:text-chrome"
                  >
                    <Icon aria-hidden="true" size={18} />
                    <span className="text-lg">{label}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      size={18}
                      className="ml-auto text-muted transition-colors group-hover:text-chrome"
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </Section>
  )
}
