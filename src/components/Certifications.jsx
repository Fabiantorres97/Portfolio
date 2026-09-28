import { CERTIFICATIONS } from '../data.js'

export default function Certifications() {
  return (
    <section id="certifications" className="section container">
      <div className="section-head">
        <h2>Certifications</h2>
      </div>

      <div className="grid grid--3">
        {CERTIFICATIONS.map((group) => (
          <article className="card" key={group.title}>
            <h3>{group.title}</h3>
            <ul className="cert-list">
              {group.items.map((item) => (
                <li key={item.name}>
                  <span className="cert-name">{item.name}</span>
                  <span className="cert-issuer">{item.issuer}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
