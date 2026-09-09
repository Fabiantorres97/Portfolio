import { useEffect } from 'react'
import { PROJECT_SUMMARY } from '../data.js'

export default function ProjectSummaryModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-summary-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal-panel">
        <button className="modal-close" onClick={onClose} aria-label="Close project summary">✕</button>

        <div className="modal-head">
          <span className="eyebrow">Asana in Practice</span>
          <h2 id="project-summary-title">Project summary</h2>
        </div>

        {PROJECT_SUMMARY.map((block) => (
          <div className="summary-block" key={block.id}>
            <h3>{block.title}</h3>
            <div className="summary-gallery">
              {block.images.map((img) => (
                <img key={img.src} src={img.src} alt={img.alt} loading="lazy" />
              ))}
            </div>
            <p>{block.paragraph}</p>
            {block.file && (
              <div className="summary-file">
                <a className="btn btn--outline btn--sm" href={block.file.href} download>
                  ⬇ {block.file.label}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
