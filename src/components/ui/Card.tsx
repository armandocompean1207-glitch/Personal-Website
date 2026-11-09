import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'li'
  children: ReactNode
}

/**
 * Metallic surface: translucent graphite, a faint top-down sheen, a hairline
 * border and a reflective top edge. Hover only changes color and opacity.
 */
export function Card({ as: Component = 'div', className, children, ...rest }: CardProps) {
  return (
    <Component
      className={cn(
        'group/card relative isolate overflow-hidden rounded-2xl metal-surface transition-colors duration-300',
        'hover:border-silver/45 focus-within:border-silver/45',
        // Reflective top edge.
        'after:pointer-events-none after:absolute after:inset-x-8 after:top-0 after:h-px after:hairline-fade',
        // Extra sheen that fades in on hover, painted under the content.
        'before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-linear-to-b before:from-chrome/6 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}
