import { EXPERIENCE } from '../data.js'
import useInView from '../useInView.js'

export default function Experience() {
  const [ref, inView] = useInView()

  return (
    <section id="experience" className="section container">
      <div className="section-head center">
        <h2>My work experience</h2>
      </div>

      <ol ref={ref} className={`timeline${inView ? ' is-visible' : ''}`}>
        {EXPERIENCE.map((job, i) => (
          <li className="timeline-item" key={`${job.role}-${job.company}`} style={{ '--i': i }}>
            <span className="timeline-dot" aria-hidden="true" />
            <div className="timeline-head">
              <h3 className="timeline-role">{job.role}</h3>
              <span className="timeline-company">{job.company}</span>
              <span className="timeline-period">{job.period}</span>
            </div>
            <ul className="dash-list">
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}
