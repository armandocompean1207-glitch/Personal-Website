import { Card } from '../components/ui/Card'
import { Section } from '../components/ui/Section'
import { Tag } from '../components/ui/Tag'
import { copy, skillGroups } from '../data/portfolio'

/** "3D & Graphics" -> "3d-graphics", for the robot anchor id. */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export function Skills() {
  return (
    <Section id="skills" eyebrow={copy.skills.eyebrow} title={copy.skills.title} width="wide">
      <ul className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <Card
            as="li"
            key={group.title}
            className="p-6"
            data-robot-anchor={`skill:${slugify(group.title)}`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-medium tracking-tight">{group.title}</h3>
              <span aria-hidden="true" className="font-mono text-xs text-muted">
                {String(group.items.length).padStart(2, '0')}
              </span>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <li key={skill}>
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </ul>
    </Section>
  )
}
