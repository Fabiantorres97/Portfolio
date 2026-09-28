import { SKILLS } from '../data.js'

export default function Skills() {
  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <div className="section-head">
          <h2>Skills</h2>
        </div>

        <div className="grid grid--4">
          {SKILLS.map((skill) => (
            <article className="card" key={skill.title}>
              <h3>{skill.title}</h3>
              <ul className="dash-list">
                {skill.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
