import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface ContentColumnProps {
  /** Desktop side for the content; the robot occupies the opposite side. */
  align?: 'left' | 'right'
  /** `text` caps the line length; `wide` uses the full ~55% column for grids. */
  width?: 'text' | 'wide'
  className?: string
  children: ReactNode
}

/**
 * The half of the page that holds content, leaving the robot's side free on
 * desktop. On mobile (and on desktop with reduced motion, where the robot holds
 * still and may sit behind text) it becomes a translucent readability panel.
 */
export function ContentColumn({ align = 'left', width = 'text', className, children }: ContentColumnProps) {
  return (
    <div
      className={cn(
        // Stacked layout: a soft borderless scrim (cards inside keep their own hairlines).
        'w-full rounded-2xl bg-linear-to-b from-background/55 to-background/80 p-5 sm:p-6',
        'lg:w-[55%] lg:bg-none lg:p-0',
        'lg:motion-reduce:bg-background/80 lg:motion-reduce:p-8',
        width === 'text' && 'max-w-xl',
        align === 'right' && 'lg:ml-auto',
        className,
      )}
    >
      {children}
    </div>
  )
}
