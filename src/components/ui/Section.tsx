import type { ReactNode } from 'react'
import type { SectionId } from '../../data/portfolio'
import { cn } from '../../lib/cn'

interface SectionProps {
  id: SectionId
  eyebrow: string
  title: string
  /** Desktop side for the text; the 3D model sits on the opposite side. */
  align?: 'left' | 'right'
  children: ReactNode
}

/** Shared full-height section layout with an accessible heading. */
export function Section({ id, eyebrow, title, align = 'left', children }: SectionProps) {
  const headingId = `${id}-title`

  return (
    <section id={id} aria-labelledby={headingId} className="flex min-h-svh items-center py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            // Mobile: a translucent panel keeps text readable over the model.
            'max-w-xl rounded-2xl bg-background/75 p-6',
            // Desktop: model is beside the text, so no panel — unless motion is
            // reduced, where the model stays put and may sit behind the text.
            'md:bg-transparent md:p-0 md:motion-reduce:bg-background/80 md:motion-reduce:p-8',
            align === 'right' && 'md:ml-auto',
          )}
        >
          <p className="text-sm font-medium tracking-widest text-accent uppercase">{eyebrow}</p>
          <h2
            id={headingId}
            className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
          >
            {title}
          </h2>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  )
}
