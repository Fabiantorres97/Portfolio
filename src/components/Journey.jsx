import { JOURNEY } from '../data.js'

export default function Journey() {
  return (
    <section id="journey" className="section section--alt">
      <div className="container journey-content">
        <h2>{JOURNEY.heading}</h2>
        <p className="journey-question">{JOURNEY.question}</p>
        {JOURNEY.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  )
}
