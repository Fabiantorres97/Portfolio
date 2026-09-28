import { useRef, useState } from 'react'
import { ArrowRight, Info } from '@phosphor-icons/react'
import { ASANA_PRACTICE, EMAIL_SAMPLE, WORK_SAMPLES_DISCLAIMER } from '../data.js'
import ProjectSummaryModal from './ProjectSummaryModal.jsx'

export default function WorkSamples() {
  const [modalOpen, setModalOpen] = useState(false)
  const triggerRef = useRef(null)

  const closeModal = () => {
    setModalOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <section id="samples" className="section container">
      <div className="section-head">
        <h2>Work samples</h2>
      </div>

      <p className="samples-note">
        <Info size={18} weight="bold" aria-hidden="true" />
        <span>{WORK_SAMPLES_DISCLAIMER}</span>
      </p>

      <article className="sample-card sample-card--feature">
        <div className="sample-media">
          <img
            src={ASANA_PRACTICE.cover.src}
            width={ASANA_PRACTICE.cover.w}
            height={ASANA_PRACTICE.cover.h}
            alt="Asana in Practice cover: procurement, onboarding and event delivery"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="sample-body">
          <h3>{ASANA_PRACTICE.title}</h3>
          {ASANA_PRACTICE.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <button
            ref={triggerRef}
            type="button"
            className="btn btn--primary btn--arrow"
            aria-haspopup="dialog"
            onClick={() => setModalOpen(true)}
          >
            {ASANA_PRACTICE.cta}
            <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </article>

      <article className="sample-card sample-card--email">
        <div className="sample-body">
          <span className="badge-real">{EMAIL_SAMPLE.badge}</span>
          <h3>{EMAIL_SAMPLE.title}</h3>
          <p>{EMAIL_SAMPLE.paragraph}</p>
        </div>
        <div className="before-after">
          {[['Before', EMAIL_SAMPLE.before], ['After', EMAIL_SAMPLE.after]].map(([label, img]) => (
            <figure key={label}>
              <img src={img.src} width={img.w} height={img.h} alt={img.alt} loading="lazy" decoding="async" />
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
      </article>

      {modalOpen && <ProjectSummaryModal onClose={closeModal} />}
    </section>
  )
}
