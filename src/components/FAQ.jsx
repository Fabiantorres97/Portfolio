import { useEffect, useRef } from 'react'
import { FAQ } from '../data.js'

export default function FAQSection() {
  const firstItemRef = useRef(null)

  useEffect(() => {
    if (firstItemRef.current) firstItemRef.current.open = true
  }, [])

  return (
    <section id="faq" className="section section--alt">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Good to know</span>
          <h2>FAQ's</h2>
        </div>

        <div className="faq-list">
          {FAQ.map((item, i) => (
            <details
              className="faq-item"
              key={item.question}
              ref={i === 0 ? firstItemRef : null}
            >
              <summary>
                {item.question}
                <span className="faq-chevron">+</span>
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
