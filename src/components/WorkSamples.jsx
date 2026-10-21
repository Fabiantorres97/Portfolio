import { useRef, useState } from 'react'
import { ArrowRight, Info } from '@phosphor-icons/react'
import { ASANA_PRACTICE, EMAIL_SAMPLE, STUDY_BOT, WORK_SAMPLES_INTRO } from '../data.js'
import ProjectSummaryModal from './ProjectSummaryModal.jsx'
import StudyBotModal from './StudyBotModal.jsx'
import Lightbox from './Lightbox.jsx'

const EMAIL_SHOTS = [
  { ...EMAIL_SAMPLE.before, label: 'Before' },
  { ...EMAIL_SAMPLE.after, label: 'After' },
]

export default function WorkSamples() {
  const [modal, setModal] = useState(null)
  const [lightbox, setLightbox] = useState(null)
  const triggers = useRef({})
  const emailShotsRef = useRef(null)
  const botCoverRef = useRef(null)

  const openModal = (name) => (e) => {
    triggers.current[name] = e.currentTarget
    setModal(name)
  }

  const closeModal = () => {
    const trigger = triggers.current[modal]
    setModal(null)
    trigger?.focus()
  }

  return (
    <section id="samples" className="section container">
      <div className="section-head">
        <h2>Work samples</h2>
      </div>

      <p className="samples-note">
        <Info size={18} weight="bold" aria-hidden="true" />
        <span>{WORK_SAMPLES_INTRO}</span>
      </p>

      <div className="samples-group" aria-labelledby="samples-simulated">
        <h3 id="samples-simulated" className="samples-group-title">Simulated examples</h3>

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
            <span className="badge-sample">{ASANA_PRACTICE.badge}</span>
            <h4>{ASANA_PRACTICE.title}</h4>
            {ASANA_PRACTICE.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <button
              type="button"
              className="btn btn--primary btn--arrow"
              aria-haspopup="dialog"
              onClick={openModal('asana')}
            >
              {ASANA_PRACTICE.cta}
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </button>
          </div>
        </article>
      </div>

      <div className="samples-group" aria-labelledby="samples-real">
        <h3 id="samples-real" className="samples-group-title">Real results</h3>

        <article className="sample-card sample-card--email">
          <div className="sample-body">
            <span className="badge-sample">{EMAIL_SAMPLE.badge}</span>
            <h4>{EMAIL_SAMPLE.title}</h4>
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

        <article className="sample-card sample-card--feature">
          <div className="sample-media sample-media--fit" ref={botCoverRef}>
            <button
              type="button"
              className="shot-btn"
              aria-haspopup="dialog"
              onClick={() => setLightbox({ images: [STUDY_BOT.cover], startIndex: 0, thumbsFrom: botCoverRef.current })}
            >
              <img
                src={STUDY_BOT.cover.src}
                width={STUDY_BOT.cover.w}
                height={STUDY_BOT.cover.h}
                alt={STUDY_BOT.cover.alt}
                loading="lazy"
                decoding="async"
              />
            </button>
          </div>
          <div className="sample-body">
            <span className="badge-sample">{STUDY_BOT.badge}</span>
            <h4>{STUDY_BOT.title}</h4>
            <p>{STUDY_BOT.paragraph}</p>
            <button
              type="button"
              className="btn btn--primary btn--arrow"
              aria-haspopup="dialog"
              onClick={openModal('bot')}
            >
              {STUDY_BOT.cta}
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </button>
          </div>
        </article>
      </div>

      {modal === 'asana' && <ProjectSummaryModal onClose={closeModal} />}
      {modal === 'bot' && <StudyBotModal onClose={closeModal} />}
      {lightbox && <Lightbox {...lightbox} onClose={() => setLightbox(null)} />}
    </section>
  )
}
