import type { ReactNode } from 'react'
import { sections, type SectionId } from '../../data/portfolio'
import { ContentColumn } from './ContentColumn'
import { Divider } from './Divider'
import { Eyebrow } from './Eyebrow'

interface SectionProps {
  id: SectionId
  eyebrow: string
  title: string
  /** Desktop side for the content; the 3D model sits on the opposite side. */
  align?: 'left' | 'right'
  /** `wide` for card grids; still stays within the content half on desktop. */
  width?: 'text' | 'wide'
  children: ReactNode
}

/** Two-digit position of a section, e.g. "02" for skills. */
const sectionIndex = (id: SectionId) =>
  String(sections.findIndex((section) => section.id === id)).padStart(2, '0')

/** Shared full-height section layout with an accessible heading. */
export function Section({ id, eyebrow, title, align = 'left', width = 'text', children }: SectionProps) {
  const headingId = `${id}-title`

  return (
    <section id={id} aria-labelledby={headingId} className="relative flex min-h-svh items-center py-20 lg:py-28">
      {/* Quiet transition between sections: a fading hairline at the top edge. */}
      <Divider className="absolute inset-x-0 top-0 mx-auto max-w-6xl opacity-60" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <ContentColumn align={align} width={width}>
          <Eyebrow index={sectionIndex(id)}>{eyebrow}</Eyebrow>
          <h2
            id={headingId}
            className="mt-5 text-4xl font-semibold tracking-display text-balance sm:text-5xl lg:text-6xl"
          >
            {title}
          </h2>
          <div className="mt-10">{children}</div>
        </ContentColumn>
      </div>
    </section>
  )
}
