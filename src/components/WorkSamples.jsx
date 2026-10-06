import { useRef, useState } from 'react'
import { ArrowRight, Info } from '@phosphor-icons/react'
import { ASANA_PRACTICE, EMAIL_SAMPLE, WORK_SAMPLES_DISCLAIMER } from '../data.js'
import ProjectSummaryModal from './ProjectSummaryModal.jsx'
import Lightbox from './Lightbox.jsx'

const EMAIL_SHOTS = [
  { ...EMAIL_SAMPLE.before, label: 'Before' },
  { ...EMAIL_SAMPLE.after, label: 'After' },
]

export default function WorkSamples() {
  const [modalOpen, setModalOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const triggerRef = useRef(null)
  const emailShotsRef = useRef(null)

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
        <div className="before-after" ref={emailShotsRef}>
          {EMAIL_SHOTS.map((img, i) => (
            <figure key={img.label}>
              <button
                type="button"
                className="shot-btn"
                aria-haspopup="dialog"
                onClick={() => setLightbox({ images: EMAIL_SHOTS, startIndex: i, thumbsFrom: emailShotsRef.current })}
              >
                <img src={img.src} width={img.w} height={img.h} alt={img.alt} loading="lazy" decoding="async" />
              </button>
              <figcaption>{img.label}</figcaption>
            </figure>
          ))}
        </div>
      </article>

      {modalOpen && <ProjectSummaryModal onClose={closeModal} />}
      {lightbox && <Lightbox {...lightbox} onClose={() => setLightbox(null)} />}
    </section>
  )
}
