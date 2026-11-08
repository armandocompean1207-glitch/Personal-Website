import { Briefcase, CodeXml, Globe, Mail, type LucideIcon } from 'lucide-react'
import { Section } from '../components/ui/Section'
import { profile, socials, type SocialKind } from '../data/portfolio'

// Lucide v1 no longer ships brand logos, so socials use generic icons.
// Swap in SVG brand icons here later if you want them.
const icons: Record<SocialKind, LucideIcon> = {
  email: Mail,
  github: CodeXml,
  linkedin: Briefcase,
  website: Globe,
}

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let’s build something">
      <p className="text-lg leading-relaxed text-muted">
        I’m open to new opportunities and collaborations. The fastest way to reach me is by email.
      </p>

      <a
        href={`mailto:${profile.email}`}
        className="mt-8 inline-block text-2xl font-medium text-accent hover:underline sm:text-3xl"
      >
        {profile.email}
      </a>

      <ul className="mt-10 flex flex-wrap gap-3">
        {socials.map(({ kind, label, href }) => {
          const Icon = icons[kind]
          const isExternal = !href.startsWith('mailto:')
          return (
            <li key={label}>
              <a
                href={href}
                {...(isExternal && { target: '_blank', rel: 'noreferrer' })}
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent"
              >
                <Icon aria-hidden="true" size={16} />
                {label}
              </a>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
