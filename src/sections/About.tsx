import { Divider } from '../components/ui/Divider'
import { Section } from '../components/ui/Section'
import { about, copy, profile } from '../data/portfolio'

export function About() {
  const [lead, ...rest] = about

  return (
    <Section id="about" eyebrow={copy.about.eyebrow} title={copy.about.title} align="right">
      <div data-robot-anchor="about:bio">
        {lead && (
          <p className="text-xl leading-relaxed text-pretty text-foreground sm:text-2xl sm:leading-relaxed">
            {lead}
          </p>
        )}
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-pretty text-muted">
          {rest.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <Divider className="mt-12" />
      <p className="mt-6 font-mono text-xs tracking-[0.22em] text-muted uppercase">
        {copy.about.locationLabel} <span className="text-foreground">{profile.location}</span>
      </p>
    </Section>
  )
}
