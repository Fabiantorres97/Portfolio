import { LinkedinLogo } from '@phosphor-icons/react'
import { CONTACT } from '../data.js'

export default function Closing() {
  return (
    <section id="contact" className="closing container">
      <h2>Thanks for taking the time to read my portfolio!!</h2>
      <div className="closing-actions">
        <a href={`mailto:${CONTACT.email}`} className="btn btn--primary">{CONTACT.email}</a>
        <a href={CONTACT.linkedinUrl} target="_blank" rel="noreferrer" className="btn btn--outline">
          <LinkedinLogo size={18} weight="fill" aria-hidden="true" />
          {CONTACT.linkedinLabel} on LinkedIn
        </a>
      </div>
    </section>
  )
}
