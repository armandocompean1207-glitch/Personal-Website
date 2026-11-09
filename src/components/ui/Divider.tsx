import { cn } from '../../lib/cn'

/** Decorative silver hairline that fades out at both ends. */
export function Divider({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('h-px w-full hairline-fade', className)} />
}
