import { DownloadSimple } from '@phosphor-icons/react'
import { PROJECT_SUMMARY } from '../data.js'
import Modal from './Modal.jsx'

export default function ProjectSummaryModal({ onClose }) {
  return (
    <Modal titleId="project-summary-title" closeLabel="Close project summary" onClose={onClose}>
      {(openLightbox) => (
        <>
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
                    onClick={(e) => openLightbox(block.images, i, e.currentTarget.parentElement)}
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
        </>
      )}
    </Modal>
  )
}
