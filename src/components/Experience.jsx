import { EXPERIENCE } from '../data.js'

export default function Experience() {
  return (
    <section id="experience" className="section container">
      <div className="section-head center">
        <span className="eyebrow">Career path</span>
        <h2>My work experience 💼</h2>
      </div>

      <div className="timeline">
        {EXPERIENCE.map((job) => (
          <div className="timeline-item" key={`${job.role}-${job.company}`}>
            <span className="timeline-dot" />
            <div className="timeline-head">
              <span className="timeline-role">{job.role}</span>
              <span className="timeline-company">— {job.company}</span>
              <span className="timeline-period">{job.period}</span>
            </div>
            <ul className="dash-list">
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
