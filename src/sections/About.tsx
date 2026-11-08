import { Section } from '../components/ui/Section'
import { about, profile } from '../data/portfolio'

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Background & experience" align="right">
      <div className="space-y-5 text-lg leading-relaxed text-muted">
        {about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">Based in {profile.location}</p>
    </Section>
  )
}
