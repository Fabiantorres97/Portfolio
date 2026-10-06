import { useCallback, useEffect, useRef, useState } from 'react'
import { DownloadSimple, X } from '@phosphor-icons/react'
import { PROJECT_SUMMARY } from '../data.js'
import Lightbox from './Lightbox.jsx'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function ProjectSummaryModal({ onClose }) {
  const [closing, setClosing] = useState(false)
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const [lightbox, setLightbox] = useState(null)
  const lightboxRef = useRef(null)
  lightboxRef.current = lightbox

  const requestClose = useCallback(() => {
    // Skip the exit animation when the user prefers reduced motion (no animationend would fire).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) onClose()
    else setClosing(true)
  }, [onClose])

  // Safety net: unmount even if the exit animation never fires (background tab, animations disabled).
  useEffect(() => {
    if (!closing) return
    const t = setTimeout(onClose, 260)
    return () => clearTimeout(t)
  }, [closing, onClose])

  useEffect(() => {
    closeRef.current?.focus()
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbar}px`

    const onKey = (e) => {
      // The image viewer is a native dialog: it owns Escape and focus while open.
      if (lightboxRef.current) return
      if (e.key === 'Escape') requestClose()
      if (e.key !== 'Tab' || !panelRef.current) return
      const items = panelRef.current.querySelectorAll(FOCUSABLE)
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [requestClose])

  return (
    <>
    <div
      className={`modal-overlay${closing ? ' is-closing' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) requestClose() }}
    >
      <div
        ref={panelRef}
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-summary-title"
      >
        <button ref={closeRef} type="button" className="modal-close" onClick={requestClose} aria-label="Close project summary">
          <X size={18} weight="bold" aria-hidden="true" />
        </button>

        <div className="modal-head">
          <h2 id="project-summary-title">Project summary</h2>
        </div>

        {PROJECT_SUMMARY.map((block) => (
          <section className="summary-block" key={block.id} aria-labelledby={`summary-${block.id}`}>
            <h3 id={`summary-${block.id}`}>{block.title}</h3>
            <div className="summary-gallery" tabIndex={0} aria-label={`${block.title} screenshots`}>
              {block.images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  className="summary-shot"
                  aria-haspopup="dialog"
                  onClick={(e) => setLightbox({
                    images: block.images,
                    startIndex: i,
                    thumbsFrom: e.currentTarget.parentElement,
                  })}
                >
                  <img src={img.src} width={img.w} height={img.h} alt={img.alt} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
            <p>{block.paragraph}</p>
            {block.file && (
              <div className="summary-file">
                <a className="btn btn--outline btn--sm" href={block.file.href} download>
                  <DownloadSimple size={16} weight="bold" aria-hidden="true" />
                  {block.file.label}
                </a>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
    {lightbox && <Lightbox {...lightbox} onClose={() => setLightbox(null)} />}
    </>
  )
}
