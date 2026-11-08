import type { ReactNode } from 'react'

/** Small pill used for skills and project tech lists. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
      {children}
    </span>
  )
}
