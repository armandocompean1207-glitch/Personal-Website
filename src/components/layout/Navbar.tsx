import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { copy, profile, sections } from '../../data/portfolio'

const NAV_ITEMS = sections.slice(1)

const LINK_CLASS =
  'font-mono text-xs tracking-[0.22em] text-muted uppercase transition-colors hover:text-foreground'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const close = () => setIsOpen(false)

  // While the mobile menu is open: Escape closes it and returns focus to the
  // toggle; a pointer press outside the header closes it.
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsOpen(false)
      toggleRef.current?.focus()
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setIsOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [isOpen])

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-line/50 bg-background/70 backdrop-blur-md"
    >
      <nav
        aria-label={copy.nav.label}
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#hero"
          className="flex items-center gap-2.5 rounded-sm font-medium tracking-tight"
          onClick={close}
        >
          {/* The page's one signature accent detail. */}
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          {profile.name}
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={`rounded-sm ${LINK_CLASS}`}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 rounded-md p-2 text-muted transition-colors hover:text-foreground md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? copy.nav.closeMenu : copy.nav.openMenu}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </nav>

      {isOpen && (
        <ul id="mobile-menu" className="border-t border-line/50 px-4 py-3 md:hidden">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className={`block py-3.5 ${LINK_CLASS}`} onClick={close}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
