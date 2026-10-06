import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CaretLeft, CaretRight, X } from '@phosphor-icons/react'

const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'
const EASE_OUT_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Transform that makes an element sitting at `to` look like it sits at `from` (FLIP).
const flip = (from, to) => ({
  transformOrigin: '0 0',
  transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`,
})
const REST = { transformOrigin: '0 0', transform: 'none' }

const inViewport = (r) =>
  r.width > 0 && r.bottom > 0 && r.right > 0 && r.top < window.innerHeight && r.left < window.innerWidth

/**
 * Image viewer. The opened image grows out of its thumbnail and returns to it on close.
 * `thumbsFrom` is the element whose <img> children are the thumbnails, in the same order as `images`.
 */
export default function Lightbox({ images, startIndex = 0, thumbsFrom, onClose }) {
  const [index, setIndex] = useState(startIndex)
  const [closing, setClosing] = useState(false)
  const dialogRef = useRef(null)
  const imgRefs = useRef([])
  const doneRef = useRef(false)
  const many = images.length > 1
  const caption = images[index].label ?? (many ? `${index + 1} / ${images.length}` : null)

  const thumbAt = useCallback((i) => thumbsFrom?.querySelectorAll('img')[i] ?? null, [thumbsFrom])

  const finish = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true
    if (dialogRef.current?.open) dialogRef.current.close()
    onClose()
  }, [onClose])

  // The thumbnail of the image on show is hidden so both read as one object.
  useLayoutEffect(() => {
    const thumb = thumbAt(index)
    if (!thumb) return
    thumb.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' })
    thumb.style.visibility = 'hidden'
    return () => { thumb.style.visibility = '' }
  }, [index, thumbAt])

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    const { overflow, paddingRight } = document.body.style
    if (overflow !== 'hidden') {
      const scrollbar = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbar}px`
    }
    if (!dialog.open) dialog.showModal()

    const thumb = thumbAt(startIndex)
    const img = imgRefs.current[startIndex]
    if (thumb && img && !prefersReducedMotion()) {
      const from = thumb.getBoundingClientRect()
      const to = img.getBoundingClientRect()
      if (from.width && to.width) {
        img.animate([flip(from, to), REST], { duration: 340, easing: EASE_OUT_EXPO })
      }
    }

    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
      if (dialog.open) dialog.close()
    }
  }, [startIndex, thumbAt])

  const requestClose = useCallback(() => {
    if (closing) return
    const img = imgRefs.current[index]
    if (!img || prefersReducedMotion()) { finish(); return }

    const to = img.getBoundingClientRect()
    const from = thumbAt(index)?.getBoundingClientRect()
    const frames = from && inViewport(from) && to.width
      ? [REST, flip(from, to)]
      : [{ opacity: 1 }, { opacity: 0 }]
    img.animate(frames, { duration: 220, easing: EASE_OUT, fill: 'forwards' })
    setClosing(true)
  }, [closing, index, thumbAt, finish])

  // Timer rather than animation events, so the viewer still closes if animations never run.
  useEffect(() => {
    if (!closing) return
    const t = setTimeout(finish, 230)
    return () => clearTimeout(t)
  }, [closing, finish])

  const go = (step) => setIndex((i) => (i + step + images.length) % images.length)

  const onKeyDown = (e) => {
    if (!many) return
    if (e.key === 'ArrowLeft') go(-1)
    if (e.key === 'ArrowRight') go(1)
  }

  return (
    <dialog
      ref={dialogRef}
      className={`lightbox${closing ? ' is-closing' : ''}`}
      aria-label="Image viewer"
      onCancel={(e) => { e.preventDefault(); requestClose() }}
      onClose={() => { if (!dialogRef.current?.open) finish() }}
      onKeyDown={onKeyDown}
      onClick={(e) => { if (!e.target.closest('button, img, .lightbox-bar')) requestClose() }}
    >
      <div className="lightbox-scrim" aria-hidden="true" />

      <button type="button" className="lightbox-btn lightbox-close" onClick={requestClose} aria-label="Close image viewer" autoFocus>
        <X size={18} weight="bold" aria-hidden="true" />
      </button>

      <div className="lightbox-stage">
        {images.map((img, i) => (
          <img
            key={img.src}
            ref={(el) => { imgRefs.current[i] = el }}
            className={`lightbox-img${i === index ? ' is-active' : ''}`}
            src={img.src}
            width={img.w}
            height={img.h}
            alt={img.alt}
            aria-hidden={i === index ? undefined : true}
            decoding="async"
          />
        ))}
      </div>

      {caption && (
        <div className="lightbox-bar">
          {many && (
            <button type="button" className="lightbox-btn" onClick={() => go(-1)} aria-label="Previous image">
              <CaretLeft size={18} weight="bold" aria-hidden="true" />
            </button>
          )}
          <p className="lightbox-caption" aria-live="polite">{caption}</p>
          {many && (
            <button type="button" className="lightbox-btn" onClick={() => go(1)} aria-label="Next image">
              <CaretRight size={18} weight="bold" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </dialog>
  )
}
