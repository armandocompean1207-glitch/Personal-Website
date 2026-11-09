import { ArrowUpRight, CodeXml } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import { Tag } from '../components/ui/Tag'
import { copy, projects, type Project } from '../data/portfolio'
import { cn } from '../lib/cn'

// Featured projects first; each keeps its data index for the robot anchor.
const ORDERED = projects
  .map((project, index) => ({ project, index }))
  .toSorted((a, b) => Number(Boolean(b.project.featured)) - Number(Boolean(a.project.featured)))

const LINK_CLASS =
  'inline-flex items-center gap-1.5 rounded-sm font-mono text-xs tracking-[0.18em] text-muted uppercase underline-offset-4 transition-colors hover:text-chrome hover:underline decoration-silver/60'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { featuredLabel, liveLabel, sourceLabel, techLabel, liveDemoLabel, sourceCodeLabel } =
    copy.projects
  const { opensInNewTab } = copy.a11y
  const isFeatured = Boolean(project.featured)

  return (
    <Card
      as="article"
      data-robot-anchor={`project:${index}`}
      className={cn('flex h-full flex-col', isFeatured ? 'p-7 sm:p-9' : 'p-6')}
    >
      <p className="flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-muted uppercase">
        <span className="text-foreground">{String(index + 1).padStart(2, '0')}</span>
        {isFeatured && (
          <>
            <span aria-hidden="true" className="h-px w-6 bg-silver/60" />
            {featuredLabel}
          </>
        )}
      </p>

      <h3
        className={cn(
          'mt-4 font-semibold tracking-display text-balance',
          isFeatured ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl',
        )}
      >
        {project.title}
      </h3>
      <p className={cn('mt-3 leading-relaxed text-pretty text-muted', isFeatured && 'text-lg')}>
        {project.description}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label={techLabel}>
        {project.tech.map((tech) => (
          <li key={tech}>
            <Tag>{tech}</Tag>
          </li>
        ))}
      </ul>

      {(project.liveUrl || project.sourceUrl) && (
        // mt-auto pins links to the card bottom so grid rows line up.
        <div className="mt-auto pt-7">
          <div className="flex gap-6 border-t border-line/70 pt-5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={LINK_CLASS}
                aria-label={`${project.title} ${liveDemoLabel} ${opensInNewTab}`}
              >
                {liveLabel} <ArrowUpRight aria-hidden="true" size={14} />
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className={LINK_CLASS}
                aria-label={`${project.title} ${sourceCodeLabel} ${opensInNewTab}`}
              >
                <CodeXml aria-hidden="true" size={14} /> {sourceLabel}
              </a>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}

export function Projects() {
  return (
    <Section id="projects" eyebrow={copy.projects.eyebrow} title={copy.projects.title} align="right" width="wide">
      <ul className="grid gap-4 lg:grid-cols-2">
        {ORDERED.map(({ project, index }) => (
          <li key={project.title} className={cn(project.featured && 'lg:col-span-2')}>
            <ProjectCard project={project} index={index} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
