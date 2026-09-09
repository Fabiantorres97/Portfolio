import { SERVICES } from '../data.js'

export default function Services() {
  return (
    <section id="services" className="section container">
      <div className="section-head">
        <span className="eyebrow">What I do</span>
        <h2>My services</h2>
      </div>

      <div className="grid grid--3">
        {SERVICES.map((service) => (
          <div className="card" key={service.title}>
            <h3>{service.title}</h3>
            <ul className="dash-list">
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {service.tools && (
              <div className="card-tools">
                <b>Tools:</b> {service.tools}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
