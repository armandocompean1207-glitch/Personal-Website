import type { ReactNode } from 'react'

/** Small hairline chip used for skills and project tech lists. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-md border border-line bg-background/50 px-2.5 py-1 text-sm text-muted">
      {children}
    </span>
  )
}
