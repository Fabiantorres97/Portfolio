import { EnvelopeSimple, LinkedinLogo } from '@phosphor-icons/react'
import { CONTACT } from '../data.js'

export default function Hero() {
  return (
    <section id="top" className="hero container">
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 className="enter" style={{ '--i': 0 }}>
            Hello! I'm Fabian Torres, your next right hand specialized in{' '}
            <span className="accent-text">Operations, Compliance, Procurement &amp; Budget Control</span>
          </h1>

          <div className="hero-lede enter" style={{ '--i': 1 }}>
            <p>I help startups and small businesses keep vendors, budgets, and deadlines under control before small gaps turn into real losses.</p>
            <p>I bring the same rigor compliance demands, a mindset built in aviation at Avianca, where any error carries real risk.</p>
            <p>Across regulated industries and remote roles, that's translated into over 6 years of keeping processes error-free, backed by certified training in AI fluency for critical, responsible use of tools like Claude and ChatGPT.</p>
            <p>Curious how that applies to your business?</p>
          </div>

          <div className="contact-card enter" style={{ '--i': 2 }}>
            <p className="contact-card-head">
              <EnvelopeSimple size={22} weight="duotone" aria-hidden="true" />
              Let's get in touch!
            </p>
            <div className="contact-actions">
              <a href={`mailto:${CONTACT.email}`} className="btn btn--primary">Send me an email</a>
              <a href={CONTACT.linkedinUrl} target="_blank" rel="noreferrer" className="btn btn--outline">
                <LinkedinLogo size={18} weight="fill" aria-hidden="true" />
                {CONTACT.linkedinLabel} on LinkedIn
              </a>
            </div>
          </div>
        </div>

        <figure className="hero-portrait-wrap">
          <div className="hero-portrait">
            <img
              src="/hero-portrait.webp"
              width="841"
              height="1292"
              alt="Portrait of Fabian Torres"
              fetchpriority="high"
              decoding="async"
            />
          </div>
          <figcaption className="hero-role">Bilingual Virtual &amp; Project Assistant</figcaption>
        </figure>
      </div>
    </section>
  )
}
