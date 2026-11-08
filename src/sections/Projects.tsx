import { CodeXml, ExternalLink } from 'lucide-react'
import { Section } from '../components/ui/Section'
import { Tag } from '../components/ui/Tag'
import { projects } from '../data/portfolio'

export function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Selected work" align="right">
      <ul className="space-y-5">
        {projects.map((project) => (
          <li key={project.title}>
            <article className="rounded-2xl border border-line bg-surface/80 p-6 transition-colors hover:border-accent/60">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{project.description}</p>

              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                {project.tech.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex gap-5 text-sm">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-accent hover:underline"
                    aria-label={`${project.title} live demo (opens in new tab)`}
                  >
                    <ExternalLink aria-hidden="true" size={16} /> Live
                  </a>
                )}
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-accent hover:underline"
                    aria-label={`${project.title} source code (opens in new tab)`}
                  >
                    <CodeXml aria-hidden="true" size={16} /> Source
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  )
}
