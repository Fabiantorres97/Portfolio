import { SERVICES } from '../data.js'

export default function Services() {
  return (
    <section id="services" className="section container">
      <div className="section-head">
        <h2>My services</h2>
      </div>

      <div className="grid grid--3">
        {SERVICES.map((service) => (
          <article className="card" key={service.title}>
            <h3>{service.title}</h3>
            <ul className="dash-list">
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {service.tools && (
              <p className="card-tools">
                <b>Tools:</b> {service.tools}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
