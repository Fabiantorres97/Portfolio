import { useEffect, useState } from 'react'
import { NAV_LINKS } from '../data.js'

export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    const desktop = window.matchMedia('(min-width: 1081px)')
    const onResize = () => { if (desktop.matches) setOpen(false) }
    document.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Primary">
        <a href="#top" className="nav-brand" onClick={close}>
          <span className="nav-mark" aria-hidden="true">FT</span>
          <span className="full">Fabian Torres</span>
        </a>

        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </div>

        <div className="nav-cta">
          <a href="#contact" className="btn btn--ghost btn--sm">Contact</a>
          <button
            type="button"
            className={`nav-burger${open ? ' is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="nav-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </nav>

      <div
        id="nav-drawer"
        className={`nav-drawer${open ? ' open' : ''}`}
        inert={open ? undefined : ''}
      >
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={close}>{link.label}</a>
        ))}
        <a href="#contact" className="btn btn--outline" onClick={close}>Contact</a>
      </div>
    </header>
  )
}
