import { useEffect, useRef } from 'react'
import { Plus } from '@phosphor-icons/react'
import { FAQ } from '../data.js'

// A little longer than the expand/collapse transition in index.css
const SETTLE_MS = 620

export default function FAQSection() {
  const listRef = useRef(null)
  const pointer = useRef(null)
  const settling = useRef(0)

  // With a mouse, only the item under the cursor is open. Touch and keyboard keep the native toggle.
  const show = (item) => {
    for (const el of listRef.current.children) el.open = el === item
    // The item closing above shifts the list under a still cursor. Wait for the heights
    // to settle before following the cursor again, or items would open in a chain.
    clearTimeout(settling.current)
    settling.current = setTimeout(() => {
      settling.current = 0
      follow()
    }, SETTLE_MS)
  }

  const follow = () => {
    const list = listRef.current
    if (!list || !pointer.current) return
    const under = document.elementFromPoint(pointer.current.x, pointer.current.y)?.closest('.faq-item')
    // Over the gap between two items nothing changes, so crossing it does not close anything.
    if (!under || under.parentElement !== list || under.open) return
    const current = [...list.children].find((el) => el.open)
    // Moving up never shifts what is under the cursor, so it does not need to wait.
    const movingUp = current && (under.compareDocumentPosition(current) & Node.DOCUMENT_POSITION_FOLLOWING)
    if (!settling.current || movingUp) show(under)
  }

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse') return
    pointer.current = { x: e.clientX, y: e.clientY }
    follow()
  }

  const onPointerLeave = (e) => {
    if (e.pointerType !== 'mouse') return
    pointer.current = null
    clearTimeout(settling.current)
    settling.current = 0
    for (const el of listRef.current.children) el.open = false
  }

  // Hover owns the open state for mouse users; a click would otherwise toggle it shut.
  const ignoreMouseClick = (e) => {
    if (e.nativeEvent.pointerType === 'mouse') e.preventDefault()
  }

  useEffect(() => () => clearTimeout(settling.current), [])

  return (
    <section id="faq" className="section section--alt">
      <div className="container">
        <div className="section-head center">
          <h2>FAQ's</h2>
        </div>

        <div className="faq-list" ref={listRef} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
          {FAQ.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary onClick={ignoreMouseClick}>
                {item.question}
                <span className="faq-chevron" aria-hidden="true">
                  <Plus size={14} weight="bold" />
                </span>
              </summary>
              <div className="faq-answer">
                {Array.isArray(item.answer) ? (
                  <ul className="dash-list">
                    {item.answer.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{item.answer}</p>
                )}
                {item.note && <p className="faq-note">{item.note}</p>}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
