import { copy, profile } from '../../data/portfolio'
import { Divider } from '../ui/Divider'

// Computed once at load so render stays pure.
const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative z-10 bg-background">
      <Divider className="mx-auto max-w-6xl" />
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 font-mono text-xs tracking-[0.18em] text-muted uppercase sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {YEAR} {profile.name}
        </p>
        <p>{copy.footer.credits}</p>
      </div>
    </footer>
  )
}
