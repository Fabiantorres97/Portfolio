import { useState } from 'react'
import { NAV_LINKS, CONTACT } from '../data.js'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="nav-wrap">
      <nav className="nav">
        <a href="#top" className="nav-brand" onClick={() => setOpen(false)}>
          <span className="nav-mark">FT</span>
          <span className="full">Fabian Torres</span>
        </a>

        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </div>

        <div className="nav-cta">
          <a href={`mailto:${CONTACT.email}`} className="btn btn--ghost btn--sm">Contact</a>
          <button
            className="nav-burger"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </nav>

      <div className={`nav-drawer${open ? ' open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
        ))}
        <a href={`mailto:${CONTACT.email}`} className="btn btn--outline">Contact</a>
      </div>
    </div>
  )
}
