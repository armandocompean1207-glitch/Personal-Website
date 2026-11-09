import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type ButtonVariant = 'primary' | 'secondary'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-[color,background-color,border-color,box-shadow,opacity] duration-200'

const VARIANTS: Record<ButtonVariant, string> = {
  // Polished chrome fill with dark text (void on silver is ~9:1).
  primary:
    'metal-fill text-background shadow-[inset_0_1px_0_rgb(255_255_255/0.6),0_1px_2px_rgb(0_0_0/0.5)] hover:opacity-90',
  secondary:
    'border border-line bg-background/40 text-foreground hover:border-silver/60 hover:bg-surface/60',
}

interface VariantProps {
  variant?: ButtonVariant
}

/** Button element in the primary (chrome) or secondary (hairline) style. */
export function Button({
  variant = 'primary',
  className,
  type = 'button',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps) {
  return <button type={type} className={cn(BASE, VARIANTS[variant], className)} {...rest} />
}

/** Link styled as a button; use for navigation and external actions. */
export function ButtonLink({
  variant = 'primary',
  className,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps) {
  return <a className={cn(BASE, VARIANTS[variant], className)} {...rest} />
}
