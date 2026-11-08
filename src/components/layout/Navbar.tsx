import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { profile, sections } from '../../data/portfolio'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-background/70 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a href="#hero" className="font-semibold tracking-tight" onClick={close}>
          {profile.name}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {sections.slice(1).map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className="text-sm text-muted transition-colors hover:text-foreground">
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="-mr-2 rounded-md p-2 text-muted hover:text-foreground md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </nav>

      {isOpen && (
        <ul id="mobile-menu" className="border-t border-line/60 px-4 py-4 md:hidden">
          {sections.slice(1).map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className="block py-3 text-lg text-muted hover:text-foreground" onClick={close}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
