import { Section } from '../components/ui/Section'
import { Tag } from '../components/ui/Tag'
import { skillGroups } from '../data/portfolio'

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools I work with">
      <div className="grid gap-8 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="font-medium">{group.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <li key={skill}>
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
