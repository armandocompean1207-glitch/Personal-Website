import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface EyebrowProps {
  /** Optional index shown before the label, e.g. "01". */
  index?: string
  className?: string
  children: ReactNode
}

/** Small monospace label with a thin silver tick, used above headings. */
export function Eyebrow({ index, className, children }: EyebrowProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-muted uppercase',
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-silver/60" />
      {index && <span className="text-foreground">{index}</span>}
      <span>{children}</span>
    </p>
  )
}
