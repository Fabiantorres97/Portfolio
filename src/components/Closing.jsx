import { CONTACT } from '../data.js'

export default function Closing() {
  return (
    <>
      <section className="closing container">
        <h2>Thanks for taking the time to read my portfolio!!</h2>
        <div className="closing-actions">
          <a href={`mailto:${CONTACT.email}`} className="btn btn--primary">{CONTACT.email}</a>
          <a href={CONTACT.linkedinUrl} target="_blank" rel="noreferrer" className="btn btn--outline">
            {CONTACT.linkedinLabel} on LinkedIn
          </a>
        </div>
      </section>

      <footer className="site-footer">
        Fabian Torres — Bilingual Virtual/Project Assistant · {CONTACT.location}
      </footer>
    </>
  )
}
