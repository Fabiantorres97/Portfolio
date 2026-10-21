import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from '@phosphor-icons/react'
import Lightbox from './Lightbox.jsx'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Shared detail-view shell: overlay, focus trap, Escape, exit animation and an image viewer.
 * `children` is a function that receives `openLightbox(images, startIndex, thumbsFrom)`.
 */
export default function Modal({ titleId, closeLabel, onClose, children }) {
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
    const t = setTimeout(onClose, 360)
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

  const openLightbox = (images, startIndex, thumbsFrom) => setLightbox({ images, startIndex, thumbsFrom })

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
          aria-labelledby={titleId}
        >
          <button ref={closeRef} type="button" className="modal-close" onClick={requestClose} aria-label={closeLabel}>
            <X size={18} weight="bold" aria-hidden="true" />
          </button>
          {children(openLightbox)}
        </div>
      </div>
      {lightbox && <Lightbox {...lightbox} onClose={() => setLightbox(null)} />}
    </>
  )
}
