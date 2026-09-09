import { useState } from 'react'
import { ASANA_PRACTICE, EMAIL_SAMPLE, WORK_SAMPLES_DISCLAIMER } from '../data.js'
import ProjectSummaryModal from './ProjectSummaryModal.jsx'

export default function WorkSamples() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section id="samples" className="section container">
      <div className="section-head">
        <span className="eyebrow">Proof of work</span>
        <h2>Work samples 💼</h2>
      </div>

      <p className="samples-note">ℹ️ {WORK_SAMPLES_DISCLAIMER}</p>

      <div className="sample-card sample-card--feature">
        <div className="sample-media">
          <img src={ASANA_PRACTICE.cover} alt="Asana in Practice — procurement, onboarding and event delivery cover" />
        </div>
        <div className="sample-body">
          <h3>{ASANA_PRACTICE.title}</h3>
          {ASANA_PRACTICE.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <button className="btn btn--primary" onClick={() => setModalOpen(true)}>
            {ASANA_PRACTICE.cta}
          </button>
        </div>
      </div>

      <div className="sample-card sample-card--email">
        <div className="sample-body">
          <span className="badge-real">{EMAIL_SAMPLE.badge}</span>
          <h3>{EMAIL_SAMPLE.title}</h3>
          <p>{EMAIL_SAMPLE.paragraph}</p>
        </div>
        <div className="before-after">
          <figure>
            <img src={EMAIL_SAMPLE.before.src} alt={EMAIL_SAMPLE.before.alt} />
            <figcaption>Before</figcaption>
          </figure>
          <figure>
            <img src={EMAIL_SAMPLE.after.src} alt={EMAIL_SAMPLE.after.alt} />
            <figcaption>After</figcaption>
          </figure>
        </div>
      </div>

      {modalOpen && <ProjectSummaryModal onClose={() => setModalOpen(false)} />}
    </section>
  )
}
